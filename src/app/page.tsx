'use client'

import { IcebergPremiumGlass, HeaderSection, WhatsAppActionEngine, FooterSection } from './components/IcebergPremiumGlass'

export default function Home() {
  return (
    <IcebergPremiumGlass>
      <HeaderSection />
      <WhatsAppActionEngine />
      <FooterSection />
    </IcebergPremiumGlass>
  )
}