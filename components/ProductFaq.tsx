import { productFaqs } from '@/lib/product-story';
import { ContactUsLink } from './ContactUsLink';
import { Reveal } from './Reveal';

export function ProductFaq() {
  return (
    <section className="page-section page-section--soft product-faq" aria-labelledby="product-faq-title">
      <div className="shell product-faq__shell">
        <Reveal>
          <header className="product-faq__head">
            <span className="eyebrow">Questions</span>
            <h2 id="product-faq-title" className="product-faq__title serif">
              Quick answers.
            </h2>
            <p className="product-faq__intro">
              One at a time. Open what you need. Everything else stays out of the way.
            </p>
          </header>
        </Reveal>

        <div className="faq-list faq-list--stack">
          {productFaqs.map((item, index) => (
            <Reveal key={item.q} delay={index * 45}>
              <details className="faq-item">
                <summary>
                  <span className="faq-item__q">{item.q}</span>
                </summary>
                <div className="faq-item__answer">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>

        <p className="product-faq__more muted">
          Still stuck? <ContactUsLink />
        </p>
      </div>
    </section>
  );
}
