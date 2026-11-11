import Link from 'next/link';
import { brand } from '@/lib/brand';

type ContactUsLinkProps = {
  className?: string;
  showEmail?: boolean;
};

export function ContactUsLink({ className = '', showEmail = false }: ContactUsLinkProps) {
  return (
    <span className={`contact-us-link ${className}`.trim()}>
      <Link href={brand.contactPath} className="contact-us-link__page">
        {brand.contactLabel} <span aria-hidden="true">→</span>
      </Link>
      {showEmail ? (
        <>
          {' '}
          <a className="contact-us-link__mail" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </>
      ) : null}
    </span>
  );
}
