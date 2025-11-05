"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface President {
  name: string
  term: string
  republic: string
  party: string
  image: string
}

const presidents: President[] = [
  {
    name: "Philibert Tsiranana",
    term: "1959-1972",
    republic: "Première République",
    party: "PSD",
    image: "/philibert-tsiranana-portrait.jpg",
  },
  {
    name: "Gabriel Ramanantsoa",
    term: "1972-1975",
    republic: "Transition",
    party: "Militaire",
    image: "/gabriel-ramanantsoa-portrait.jpg",
  },
  {
    name: "Richard Ratsimandrava",
    term: "1975 (6 jours)",
    republic: "Transition",
    party: "Militaire",
    image: "/richard-ratsimandrava-portrait.jpg",
  },
  {
    name: "Gilles Andriamahazo",
    term: "1975",
    republic: "Transition",
    party: "Militaire",
    image: "/gilles-andriamahazo-portrait.jpg",
  },
  {
    name: "Didier Ratsiraka",
    term: "1975-1993",
    republic: "Deuxième République",
    party: "AREMA",
    image: "/didier-ratsiraka-portrait.jpg",
  },
  {
    name: "Albert Zafy",
    term: "1993-1996",
    republic: "Troisième République",
    party: "UNDD",
    image: "/albert-zafy-portrait.jpg",
  },
  {
    name: "Norbert Ratsirahonana",
    term: "1996-1997",
    republic: "Intérim",
    party: "Indépendant",
    image: "/norbert-ratsirahonana-portrait.jpg",
  },
  {
    name: "Didier Ratsiraka",
    term: "1997-2002",
    republic: "Troisième République",
    party: "AREMA",
    image: "/didier-ratsiraka-second-term.jpg",
  },
  {
    name: "Marc Ravalomanana",
    term: "2002-2009",
    republic: "Troisième République",
    party: "TIM",
    image: "/marc-ravalomanana-portrait.jpg",
  },
  {
    name: "Andry Rajoelina",
    term: "2009-2014",
    republic: "Transition",
    party: "TGV",
    image: "/andry-rajoelina-portrait.jpg",
  },
  {
    name: "Hery Rajaonarimampianina",
    term: "2014-2018",
    republic: "Quatrième République",
    party: "HVM",
    image: "/hery-rajaonarimampianina-portrait.jpg",
  },
  {
    name: "Andry Rajoelina",
    term: "2019-Présent",
    republic: "Quatrième République",
    party: "IRD",
    image: "/andry-rajoelina-current-president.jpg",
  },
]

const timelineEvents = [
  { year: "1958", event: "Proclamation de la République" },
  { year: "1959", event: "Philibert Tsiranana - Première République" },
  { year: "1972", event: "Crise politique et transition militaire" },
  { year: "1975", event: "Didier Ratsiraka - Deuxième République" },
  { year: "1993", event: "Albert Zafy - Troisième République" },
  { year: "2002", event: "Marc Ravalomanana élu" },
  { year: "2009", event: "Crise politique - Andry Rajoelina" },
  { year: "2014", event: "Hery Rajaonarimampianina - Quatrième République" },
  { year: "2019", event: "Andry Rajoelina réélu" },
]

function PresidentCard({ president, index }: { president: President; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-accent transition-colors">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <img
              src={president.image || "/placeholder.svg"}
              alt={president.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-accent/20"
            />
            <div className="flex-1 space-y-1">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">{president.name}</h3>
              <p className="text-sm text-muted-foreground">{president.term}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                  {president.republic}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {president.party}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Timeline() {
  const [progress, setProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = rect.height

      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(windowHeight - rect.top, timelineHeight)
        const progressPercent = (visibleHeight / timelineHeight) * 100
        setProgress(Math.min(Math.max(progressPercent, 0), 100))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={timelineRef} className="relative py-8">
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border">
        <div
          className="absolute top-0 left-0 w-full bg-accent transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div className="space-y-8 pl-12 sm:pl-20">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative">
            <div
              className={`absolute -left-[2.15rem] sm:-left-[3.15rem] top-1 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                progress > (index / timelineEvents.length) * 100
                  ? "bg-accent border-accent scale-110"
                  : "bg-background border-border"
              }`}
            />
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-accent">{event.year}</p>
              <p className="text-sm sm:text-base text-muted-foreground">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src="/madagascar-emblem.jpg" alt="Emblème de Madagascar" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-balance">
              Présidents de Madagascar (1958-Présent)
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Introduction */}
        <section className="max-w-3xl">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Cet article dresse la liste des présidents de la république de Madagascar depuis le 14 octobre 1958, date de
            la proclamation de la République malgache.
          </p>
        </section>

        {/* Liste des Présidents */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Liste des Présidents</h2>
          <div className="space-y-4">
            {presidents.map((president, index) => (
              <PresidentCard key={index} president={president} index={index} />
            ))}
          </div>
        </section>

        {/* Frise Chronologique */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frise Chronologique</h2>
          <Timeline />
        </section>

        {/* Classement & Records */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Classement & Records</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="duree" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline">
                Durée de mandat
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                    <span className="font-medium">Didier Ratsiraka</span>
                    <span className="text-accent font-bold">22 ans, 7 mois, 13 jours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Philibert Tsiranana</span>
                    <span className="text-muted-foreground">13 ans, 5 mois</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Marc Ravalomanana</span>
                    <span className="text-muted-foreground">7 ans, 2 mois</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="longevite" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline">
                Longévité
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Présidents vivants</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Marc Ravalomanana
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Hery Rajaonarimampianina
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Andry Rajoelina (en fonction)
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="records" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline">
                Records
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <h4 className="font-semibold mb-1 text-foreground">Mandat le plus court</h4>
                    <p className="text-sm text-muted-foreground">
                      Richard Ratsimandrava - <span className="font-bold">6 jours</span> (assassiné en 1975)
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <h4 className="font-semibold mb-1 text-foreground">Président actuel</h4>
                    <p className="text-sm text-muted-foreground">Andry Rajoelina - En fonction depuis 2019</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h4 className="font-semibold mb-1 text-foreground">Présidents réélus</h4>
                    <p className="text-sm text-muted-foreground">Didier Ratsiraka (1997) et Andry Rajoelina (2019)</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 bg-card/30">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Historical Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Histoire Présidentielle
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                République de Madagascar
                <br />
                1958 - {new Date().getFullYear()}
              </p>
            </div>

            {/* Developer Contact */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Développeur</h3>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Richmano NASY</p>
                <p className="text-sm text-muted-foreground">Full JavaScript Developer</p>
                <p className="text-xs text-muted-foreground">React • Next.js • Modern Web Technologies</p>
                <div className="pt-2">
                  <a
                    href="mailto:contact@richmanonasy.dev"
                    className="text-sm text-accent hover:text-accent/80 transition-colors underline-offset-4 hover:underline"
                  >
                    rnasy@outlook.fr
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Richmano NASY. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
