const LEX_API_URL = process.env.NEXT_PUBLIC_LEX_API_URL || 'http://localhost:8001';

export interface LexRiskClause {
  clause: string;
  level: 'red' | 'orange' | 'green';
  explanation: string;
}

export interface LexAnalysis {
  risk_clauses: LexRiskClause[];
  missing_points: string[];
  party_a_obligations: string[];
  party_b_obligations: string[];
  termination_conditions: string;
  simple_summary: string;
  language: string;
}

export interface LexResult {
  analysis: LexAnalysis;
  language: string;
  report_base64: string;
}

export async function analyzePDF(file: File): Promise<LexResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${LEX_API_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erreur inconnue' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export function downloadReport(base64: string, filename = 'lex_rapport.docx'): void {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  const blob = new Blob([bytes], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
