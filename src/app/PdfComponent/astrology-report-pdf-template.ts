
export function generateAstrologyPdfHtml(r: any): string {
  const escapeHTML = (unsafe: string) => {
    if (!unsafe) return '—';
    const map: { [key: string]: string } = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return unsafe.replace(/[&<"'>]/g, (m: keyof typeof map) => map[m]);
  };

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            line-height: 1.4;
            padding: 10px 15px;
            max-width: 100%;
            margin: 0;
            font-size: 12px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .title {
            color: #2c5282;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .subtitle {
            font-size: 14px;
            color: #4a5568;
          }
          .section {
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          .section-title {
            color: #2c5282;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 3px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 15px;
          }
          .info-item {
            margin-bottom: 5px;
          }
          .signs-box {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-around;
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 11px;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 6px;
            text-align: center;
          }
          th {
            background-color: #f8fafc;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          ul {
            margin: 8px 0 8px 15px;
            padding-left: 0;
          }
          li {
            margin-bottom: 5px;
          }
          .highlight-box {
            background: #fffaf0;
            border: 1px solid #feebc8;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
          }
          .analysis-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">ASTROLOGY REPORT</div>
          <div class="subtitle">${escapeHTML(r.name)}</div>
        </div>

        <div class="info-grid">
          <div class="info-item"><b>Date of Birth:</b> ${escapeHTML(r.birthDate?.split('T')[0] || r.dateOfBirth || '')}</div>
          <div class="info-item"><b>Time of Birth:</b> ${escapeHTML(r.formattedTime ?? r.timeOfBirth ?? '')}</div>
          <div class="info-item"><b>Place:</b> ${escapeHTML(r.place ?? r.city ?? '')}</div>
          <div class="info-item"><b>Report Date:</b> ${new Date().toLocaleDateString()}</div>
        </div>

        ${(r.moonSign || r.ascendantSign) ? `
          <div class="signs-box">
            <div><b>Moon Sign:</b> ${escapeHTML(r.moonSign || 'N/A')}</div>
            <div><b>Ascendant Sign:</b> ${escapeHTML(r.ascendantSign || 'N/A')}</div>
          </div>
        ` : ''}

        ${r.planets?.length ? `
          <div class="section">
            <div class="section-title">PLANETARY POSITIONS</div>
            <table>
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Sign</th>
                  <th>Degree</th>
                </tr>
              </thead>
              <tbody>
                ${r.planets.map((p: any) => `
                  <tr>
                    <td>${escapeHTML(p.planet)}</td>
                    <td>${escapeHTML(p.sign)}</td>
                    <td>${p.degree?.toFixed(2) ?? '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${r.planetaryStrengths?.length ? `
          <div class="section">
            <div class="section-title">PLANETARY STRENGTHS</div>
            <ul>
              ${r.planetaryStrengths.map((s: string) => `<li>${escapeHTML(s)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${r.yogas?.length ? `
          <div class="section">
            <div class="section-title">YOGA ANALYSIS</div>
            <ul>
              ${r.yogas.map((s: string) => `<li>${escapeHTML(s)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${r.healthAnalysis ? `
          <div class="analysis-box">
            <div class="section-title">HEALTH ANALYSIS</div>
            <p>${escapeHTML(r.healthAnalysis)}</p>
          </div>
        ` : ''}

        ${r.careerAnalysis ? `
          <div class="analysis-box">
            <div class="section-title">CAREER ANALYSIS</div>
            <p>${escapeHTML(r.careerAnalysis.careerInsight || r.careerAnalysis)}</p>
          </div>
        ` : ''}

        ${r.relationshipsAnalysis ? `
          <div class="analysis-box">
            <div class="section-title">RELATIONSHIPS ANALYSIS</div>
            <p>${escapeHTML(r.relationshipsAnalysis)}</p>
          </div>
        ` : ''}

        ${r.financesAnalysis ? `
          <div class="analysis-box">
            <div class="section-title">FINANCES ANALYSIS</div>
            <p>${escapeHTML(r.financesAnalysis)}</p>
          </div>
        ` : ''}

        ${r.lifePrediction ? `
          <div class="analysis-box">
            <div class="section-title">LIFE PREDICTION</div>
            <p>${escapeHTML(r.lifePrediction)}</p>
          </div>
        ` : ''}

        <div class="highlight-box">
          <div class="section-title">KEY TAKEAWAYS</div>
<ul>
  ${r.healthAnalysis ? `<li><b>Health:</b> ${escapeHTML(r.healthAnalysis.substring(0, 100))}...</li>` : ''}
  ${r.careerAnalysis && r.careerAnalysis.careerInsight
    ? `<li><b>Career:</b> ${escapeHTML(r.careerAnalysis.careerInsight.substring(0, 100))}...</li>` : ''}
  ${r.relationshipsAnalysis ? `<li><b>Relationships:</b> ${escapeHTML(r.relationshipsAnalysis.substring(0, 100))}...</li>` : ''}
  ${r.financesAnalysis ? `<li><b>Finances:</b> ${escapeHTML(r.financesAnalysis.substring(0, 100))}...</li>` : ''}
  ${r.lifePrediction ? `<li><b>Life Path:</b> ${escapeHTML(r.lifePrediction.substring(0, 100))}...</li>` : ''}
</ul>
        </div>
      </body>
    </html>
  `;
}
