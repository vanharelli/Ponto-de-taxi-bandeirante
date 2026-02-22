'use client'

import { IcebergPremiumGlass, HeaderSection, WhatsAppActionEngine, FooterSection } from './components/IcebergPremiumGlass'

export default function Home() {
  return (
    <IcebergPremiumGlass>
      {(t: any) => (
        <>
          <HeaderSection t={t} />
          <WhatsAppActionEngine t={t} />
          <FooterSection t={t} />
        </>
      )}
    </IcebergPremiumGlass>
  )
}