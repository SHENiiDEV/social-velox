import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import LegalLayout from '../../Components/LegalLayout';
import { Coins, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Terms({ excludedCountries = [] }) {
  const { company } = usePage().props;
  const operatorName = company?.name || 'Velox Entertainment N.V.';
  const supportEmail = company?.email || 'support@velox-play.com';
  const sections = [
    {
      id: 'agreement',
      title: 'About these terms',
      content: <>
        <p>These Terms of Service govern your use of Velox Play, including its games, account features, coin store, promotions, and community services (the “Service”). The Service is operated by {operatorName} (“we”, “us”, or “our”).</p>
        <p>By creating an account, you agree to these terms. Please read them together with our <Link href="/privacy" className="text-blue-400 underline underline-offset-4">Privacy Policy</Link> and <Link href="/responsible-gaming" className="text-blue-400 underline underline-offset-4">Responsible Gaming Policy</Link>. If you do not agree, do not create an account or use the Service.</p>
      </>,
    },
    {
      id: 'eligibility',
      title: 'Who can play',
      content: <>
        <p>You must be at least 18 years old and meet any higher age requirement that applies where you live. You are responsible for ensuring that your use of the Service is permitted in your location.</p>
        <p>Provide accurate registration details and keep them up to date. Eligibility is based on the information you supply. We do not require identity documents, selfies, bank statements, utility bills, or proof of address to register or play.</p>
        <p>Registration is unavailable to residents of the following countries. Do not use false details or location masking to bypass these restrictions.</p>
        <div className="rounded-xl border border-[#304653] bg-[#0F212E] p-4 text-xs leading-6">{excludedCountries.join(' · ')}</div>
      </>,
    },
    {
      id: 'accounts',
      title: 'Your account and security',
      content: <>
        <p>Maintain one personal account. Do not share, sell, transfer, or create accounts for another person. Keep your password private and use a password that you do not use elsewhere.</p>
        <p>Contact support promptly if you suspect someone has accessed your account without permission. We may restrict access to protect an account or investigate misuse. An account identifier is used to associate your play and balance with your account.</p>
      </>,
    },
    {
      id: 'social-coins',
      title: 'Social Coins and game outcomes',
      content: <>
        <p>Social Coins (“SC”) are virtual credits for entertainment within the Service. You may receive them through available bonuses, promotions, or optional store purchases. They are not money, a deposit, an investment, or a payment instrument.</p>
        <p>SC have no cash value. They cannot be withdrawn, transferred to other players, sold, or redeemed for cash, goods, or prizes. The Service does not offer real-money gambling or cash-out functionality.</p>
        <p>Playing may increase or decrease your SC balance according to the rules of the selected game. No outcome, reward, or return is guaranteed. Success in social games does not predict success in real-money gambling.</p>
      </>,
    },
    {
      id: 'purchases',
      title: 'Optional purchases and billing',
      content: <>
        <p>Store purchases are optional and provide virtual entertainment credits only. Review the price, currency, SC amount, and any stated bonus before confirming a purchase. Only use a payment method you are authorised to use.</p>
        <p>A purchase does not create a withdrawable balance or a right to a financial return. Spending SC in a game does not entitle you to a refund of the purchase price.</p>
        <p>If a purchase is unauthorised, duplicated, not delivered, or otherwise incorrect, contact support with the transaction reference and a description of the issue. Do not send full card details or passwords. Refunds and remedies are subject to applicable law; nothing in these terms excludes mandatory consumer rights, including any applicable cancellation or digital-content rights.</p>
      </>,
    },
    {
      id: 'promotions',
      title: 'Bonuses, promotions and VIP rewards',
      content: <>
        <p>Promotions, daily rewards, challenges, and VIP benefits may have specific eligibility rules, claim limits, and availability periods. Any additional conditions must be displayed with the offer. Read those conditions before participating.</p>
        <p>Promotional SC and VIP points have no cash value. Do not create multiple accounts, use automation, or exploit errors to claim additional rewards. We may correct rewards credited in error and restrict participation where an offer has been abused.</p>
      </>,
    },
    {
      id: 'conduct',
      title: 'Fair use and community conduct',
      content: <>
        <p>Use the Service lawfully and respectfully. Do not harass others, post hateful or unlawful content, spam, impersonate another person, disclose private information, or advertise without permission.</p>
        <p>Do not interfere with the Service, access another account, manipulate game requests or balances, exploit software defects, or use bots or scripts to gain an unfair advantage. Report suspected errors to support.</p>
        <p>Community messages may be moderated. We may remove content or restrict chat access when these rules are breached.</p>
      </>,
    },
    {
      id: 'availability',
      title: 'Availability, errors and changes',
      content: <>
        <p>Games and features may be temporarily unavailable because of maintenance, technical faults, or provider interruptions. We do not guarantee uninterrupted access or that every game will remain available.</p>
        <p>Where a technical error affects a round, reward, or balance, we may investigate the available records and correct the affected entry. Contact support if your balance appears incorrect. We will not treat an apparent error as a guaranteed reward.</p>
      </>,
    },
    {
      id: 'closure',
      title: 'Taking a break and closing an account',
      content: <>
        <p>You can stop playing at any time. Contact support to request an account closure or a break from the Service. Our <Link href="/responsible-gaming" className="text-blue-400 underline underline-offset-4">Responsible Gaming Policy</Link> explains how to request assistance.</p>
        <p>We may suspend or close an account for a material breach of these terms, ineligible use, security concerns, or unlawful activity. Where reasonably possible, we will explain the reason and allow you to contact support about the decision.</p>
        <p>Closing an account ends access to its virtual credits and benefits. They cannot be cashed out. Any statutory refund or other consumer right remains unaffected. Personal data is handled according to our Privacy Policy.</p>
      </>,
    },
    {
      id: 'ownership',
      title: 'Content and intellectual property',
      content: <>
        <p>The Service, its branding, software, artwork, and game content belong to us or the relevant rights holders. You receive limited permission to use the Service for personal entertainment, subject to these terms.</p>
        <p>You may not copy, distribute, sell, or commercially exploit the Service or its content without the relevant rights holder’s permission, except where the law allows it.</p>
      </>,
    },
    {
      id: 'rights',
      title: 'Responsibility and your legal rights',
      content: <>
        <p>To the extent permitted by applicable law, the Service is provided on an “as available” basis, and we are not responsible for indirect losses arising from its use. You remain responsible for your own internet connection, device, and account security.</p>
        <p>Nothing in these terms excludes liability that cannot lawfully be excluded, or limits mandatory consumer protections or your right to seek a remedy before a competent court. If a provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law.</p>
        <p>We may update these terms as the Service changes. Material changes will be communicated through the Service before they take effect. The revision date appears above. If you do not accept an update, stop using the Service and contact support about closing your account.</p>
      </>,
    },
    {
      id: 'contact',
      title: 'Operator, support and complaints',
      content: <>
        <p>The Service is operated by <strong className="text-white">{operatorName}</strong>{company?.address && <>, at {company.address}</>}{(company?.number || company?.reg_number) && <>. Registration number: {company.number || company.reg_number}</>}.</p>
        <p>For account questions, purchase issues, or complaints, email <a href={`mailto:${supportEmail}`} className="break-all text-blue-400 underline underline-offset-4">{supportEmail}</a> or use our <Link href="/support" className="text-blue-400 underline underline-offset-4">support page</Link>. Include your account email, the relevant dates, and a clear description so we can investigate. Never send your password.</p>
      </>,
    },
  ];

  return (
    <LegalLayout title="Terms of Service" subtitle="Clear rules for your account, Social Coins, purchases, and play on Velox Play." activeTab="terms">
      <article className="rounded-3xl border border-[#213743] bg-[#1A2C38] p-5 sm:p-8 space-y-9 text-sm leading-7 text-[#B1BAD3]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#304653] pb-5 text-xs">
          <span className="font-semibold uppercase tracking-wider text-blue-400">Velox Play / Player agreement</span>
          <span>Last updated: <time dateTime="2026-10-09">9 October 2026</time></span>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-white">Before you play</h2>
          <p>Velox Play is a social casino for entertainment. Play with virtual coins, set your own limits, and keep purchases within a budget you are comfortable with.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Adults only', detail: '18+ and eligible in your location.' },
              { icon: Coins, title: 'Virtual coins only', detail: 'No cash value or withdrawals.' },
              { icon: HeartHandshake, title: 'Play at your pace', detail: 'Purchases are always optional.' },
            ].map(({ icon: Icon, title, detail }) => (
              <div key={title} className="rounded-xl border border-[#304653] bg-[#0F212E] p-4 space-y-2">
                <Icon aria-hidden="true" className="h-5 w-5 text-blue-400" />
                <p className="font-semibold leading-5 text-white">{title}</p>
                <p className="text-xs leading-5">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Terms contents" className="rounded-2xl border border-[#304653] p-5">
          <h2 className="mb-3 font-semibold text-white">In this agreement</h2>
          <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="flex gap-2 rounded text-xs leading-5 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400">
                  <span className="text-blue-400">{String(index + 1).padStart(2, '0')}</span>{section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="divide-y divide-[#304653]">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 py-7 first:pt-0 last:pb-0 space-y-4">
              <h2 id={`${section.id}-title`} className="flex gap-3 text-lg font-semibold leading-7 tracking-tight text-white">
                <span className="text-blue-400">{String(index + 1).padStart(2, '0')}</span>{section.title}
              </h2>
              <div className="space-y-3">{section.content}</div>
            </section>
          ))}
        </div>
      </article>
    </LegalLayout>
  );
}
