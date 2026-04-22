export interface Faq {
  question: string
  answer: string
}

export function extractFaqs(rawBody: string): Faq[] {
  const faqs: Faq[] = []
  const lines = rawBody.split('\n')
  let currentQuestion = ''
  let currentAnswer: string[] = []

  for (const line of lines) {
    if (/^###\s+/.test(line)) {
      if (currentQuestion && currentAnswer.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() })
      }
      currentQuestion = line.replace(/^###\s+/, '').trim()
      currentAnswer = []
    } else if (line.trim() && currentQuestion && !/^#{1,2}\s/.test(line)) {
      currentAnswer.push(line.trim())
    } else if (/^#{1,2}\s/.test(line) && currentQuestion) {
      if (currentAnswer.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() })
      }
      currentQuestion = ''
      currentAnswer = []
    }
  }
  if (currentQuestion && currentAnswer.length) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() })
  }
  return faqs
}

export function buildFaqSchema(faqs: Faq[]): object | null {
  if (faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
