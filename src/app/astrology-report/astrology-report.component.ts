import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstrologyReport } from '../model/astrology-report';

@Component({
  selector: 'app-astrology-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './astrology-report.component.html',
  styleUrls: ['./astrology-report.component.css']
})
export class AstrologyReportComponent {
  @Input() report!: AstrologyReport;
}
