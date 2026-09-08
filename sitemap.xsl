<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="id">
      <head>
        <title>XML Sitemap — Extensia Creative Bali</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #F8F9FA;
            color: #111118;
            padding: 32px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 980px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 2px solid #111118;
            border-radius: 12px;
            box-shadow: 6px 6px 0 0 #111118;
            overflow: hidden;
          }
          .header {
            background: #FFF9D5;
            border-bottom: 2px solid #111118;
            padding: 28px 32px;
          }
          .brand-badge {
            display: inline-block;
            background: #D4FF00;
            color: #111118;
            border: 2px solid #111118;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 4px 10px;
            margin-bottom: 12px;
            box-shadow: 2px 2px 0 0 #111118;
          }
          h1 {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #111118;
            margin-bottom: 8px;
          }
          .subtitle {
            font-size: 14px;
            color: #4A4A52;
            max-width: 680px;
          }
          .subtitle a {
            color: #2563EB;
            text-decoration: none;
            font-weight: 600;
          }
          .subtitle a:hover {
            text-decoration: underline;
          }
          .stats-bar {
            display: flex;
            gap: 16px;
            padding: 16px 32px;
            background: #FFFFFF;
            border-bottom: 1px solid #E5E7EB;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
          }
          .stats-bar span {
            color: #111118;
            background: #F3F4F6;
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid #D1D5DB;
          }
          .table-wrapper {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
          }
          thead {
            background-color: #111118;
            color: #FFFFFF;
          }
          th {
            padding: 12px 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            font-size: 11px;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #E5E7EB;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover {
            background-color: #FFFDF0;
          }
          td.url-cell {
            font-weight: 600;
            word-break: break-all;
          }
          td.url-cell a {
            color: #2563EB;
            text-decoration: none;
          }
          td.url-cell a:hover {
            text-decoration: underline;
          }
          .priority-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 11px;
            background: #E0E7FF;
            color: #3730A3;
          }
          .priority-high {
            background: #DCFCE7;
            color: #166534;
          }
          .footer {
            padding: 16px 32px;
            background: #FAFAFA;
            border-top: 1px solid #E5E7EB;
            font-size: 12px;
            color: #6B7280;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: gap;
          }
          .footer a {
            color: #111118;
            text-decoration: none;
            font-weight: 600;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          @media (max-width: 640px) {
            body { padding: 16px 12px; }
            .header { padding: 20px; }
            .stats-bar { padding: 12px 20px; }
            .footer { padding: 12px 20px; flex-direction: column; gap: 8px; text-align: center; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand-badge">Extensia Creative Bali</div>
            <h1>XML Sitemap Index</h1>
            <p class="subtitle">
              Peta situs XML resmi untuk mesin pencari seperti Google, Bing, dan Yandex.
              Dikelola oleh <a href="https://www.extensiacreativebali.my.id/">Extensia Creative Bali</a>.
            </p>
          </div>
          <div class="stats-bar">
            <div>Total URL: <span><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span></div>
            <div>Format: <span>Sitemaps Protocol 0.9</span></div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL</th>
                  <th style="width: 15%;">Priority</th>
                  <th style="width: 15%;">Changefreq</th>
                  <th style="width: 15%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="url-cell">
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:variable name="priorityVal">
                        <xsl:value-of select="sitemap:priority"/>
                      </xsl:variable>
                      <span class="priority-badge">
                        <xsl:if test="$priorityVal &gt;= 0.9">
                          <xsl:attribute name="class">priority-badge priority-high</xsl:attribute>
                        </xsl:if>
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <div class="footer">
            <div>Extensia Creative Bali — Studio Aplikasi Kustom &amp; Software House Bali</div>
            <div><a href="https://www.extensiacreativebali.my.id/">Kembali ke Beranda &#8594;</a></div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
