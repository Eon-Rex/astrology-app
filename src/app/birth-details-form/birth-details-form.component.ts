import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { AstrologyService } from '../service/Astrology.service';
import { AstrologyReportComponent } from '../astrology-report/astrology-report.component';
import { AstrologyReport } from '../model/astrology-report';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { generateAstrologyPdfHtml } from '../PdfComponent/astrology-report-pdf-template';

@Component({
  selector: 'app-birth-details-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, AstrologyReportComponent],
  templateUrl: './birth-details-form.component.html',
  styleUrls: ['./birth-details-form.component.css']
})
export class BirthDetailsFormComponent implements OnInit {
  name = '';
  dob: string = '';
  time: string = '';
  state: string = '';
  city: string = '';
  states: string[] = [];
  cities: string[] = [];
  stateCityMap: { [state: string]: string[] } = {};
  loading = false;
  error: string | null = null;
  report: AstrologyReport | null = null;
  sanitizedHtml: SafeHtml | null = null;

  constructor(
    private astrologyService: AstrologyService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.astrologyService.getStatesAndCities().subscribe({
      next: (data) => {
        this.stateCityMap = data;
        this.states = Object.keys(data);
      },
      error: () => {
        this.states = [];
        this.stateCityMap = {};
      }
    });
  }

  onStateChange() {
    this.city = '';
    this.cities = this.stateCityMap[this.state] || [];
  }

  onSubmit() {
    if (!this.name || !this.dob || !this.time || !this.state || !this.city) {
      this.error = 'All fields are required.';
      return;
    }
    this.loading = true;
    this.error = null;
    this.report = null;

    const requestData = {
      name: this.name,
      dateOfBirth: this.dob,
      city: this.city,
      timeOfBirth: this.time,
    };

    this.astrologyService.generateReport(requestData).subscribe({
      next: (response: AstrologyReport) => {
        this.report = response;
        if (response.data && response.data.content) {
          const formattedContent = response.data.content.replace(/\r\n/g, '<br>');
          this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(formattedContent);
        } else {
          this.sanitizedHtml = null;
        }
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to generate report. Please try again.';
        this.loading = false;
        console.error('Report generation error:', err);
      }
    });
  }

  async downloadReport() {
    if (!this.report?.data) {
      alert('No report data available to download!');
      return;
    }
    const r = this.report.data;
    const htmlContent = generateAstrologyPdfHtml(r);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(htmlContent);
      win.document.close();
      setTimeout(() => {
        import('html2canvas').then((html2canvas) => {
          html2canvas.default(win.document.body, {
            scale: 2,
            logging: false,
            useCORS: true
          }).then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`Astrology_Report_${r.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
            win.close();
          });
        }).catch(err => {
          console.error('Error loading html2canvas:', err);
          win.close();
        });
      }, 500);
    }
  }
}