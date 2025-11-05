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
  bio: string
}

const presidents: President[] = [
  {
    name: "Philibert Tsiranana",
    term: "1959-1972",
    republic: "Première République",
    party: "PSD",
    image: "/philibert-tsiranana-portrait.jpg",
    bio: "Philibert Tsiranana (1910-1978) fut le premier président de la République malgache, souvent surnommé le « Père de l'Indépendance ». Il a dirigé le pays de 1959 à 1972, une période de relative stabilité politique. Son régime se caractérisait par un Socialisme malgache pragmatique et des liens forts avec la France. Son mandat s'est terminé de manière abrupte en 1972, après de vastes manifestations étudiantes et populaires, le forçant à remettre les pleins pouvoirs au Général Ramanantsoa.",
  },
  {
    name: "Gabriel Ramanantsoa",
    term: "1972-1975",
    republic: "Transition",
    party: "Militaire",
    image: "/gabriel-ramanantsoa-portrait.jpg",
    bio: "Le Général Gabriel Ramanantsoa (1906-1979) prend la tête de l'État en 1972 après la crise politique ayant renversé Tsiranana, marquant le début de la « transition militaire ». Sa direction avait pour objectif la malgachisation de l'administration et de l'enseignement. Il a cherché à ramener l'ordre dans une période de forte agitation sociale et économique, avant de remettre ses pouvoirs au Colonel Ratsimandrava en février 1975.",
  },
  {
    name: "Richard Ratsimandrava",
    term: "1975 (6 jours)",
    republic: "Transition",
    party: "Militaire",
    image: "/richard-ratsimandrava-portrait.jpg",
    bio: "Le Colonel Richard Ratsimandrava (1931-1975) est resté chef d'État pendant seulement six jours (du 5 au 11 février 1975). Son accession au pouvoir était vue comme le début d'une nouvelle ère de développement national axée sur le Fokon'olona (système communautaire malgache). Son programme fut brusquement interrompu par son assassinat dans des circonstances qui n'ont jamais été élucidées.",
  },
  {
    name: "Gilles Andriamahazo",
    term: "1975",
    republic: "Transition",
    party: "Militaire",
    image: "/gilles-andriamahazo-portrait.jpg",
    bio: "Le Général Gilles Andriamahazo (1919-1989) a brièvement assuré la présidence du Comité national militaire après l'assassinat de Richard Ratsimandrava en février 1975. Son rôle principal fut d'être un garant de l'ordre et de la stabilité durant la période d'enquête et de fortes tensions, jusqu'à ce que le pouvoir soit transféré à Didier Ratsiraka en juin 1975.",
  },
  {
    name: "Didier Ratsiraka",
    term: "1975-1993",
    republic: "Deuxième République",
    party: "AREMA",
    image: "/didier-ratsiraka-portrait.jpg",
    bio: "Didier Ratsiraka (1936-2021), surnommé l'« Amiral rouge », a dominé la vie politique malgache. Son premier mandat (1975-1993) a marqué l'instauration de la Deuxième République, un régime fondé sur une idéologie socialiste et tiers-mondiste. Il a nationalisé des secteurs clés de l'économie. Il a été chassé du pouvoir en 1993 après des années de crise économique et de grandes manifestations.",
  },
  {
    name: "Albert Zafy",
    term: "1993-1996",
    republic: "Troisième République",
    party: "UNDD",
    image: "/albert-zafy-portrait.jpg",
    bio: "Le Professeur Albert Zafy (1927-2017) a été le premier président de la Troisième République (1993-1996). Il a été porté au pouvoir sur une plateforme axée sur la démocratie et la lutte contre la corruption. Son mandat fut cependant marqué par des conflits institutionnels majeurs avec le Parlement et le Premier ministre, conduisant à sa destitution par la Haute Cour Constitutionnelle en 1996.",
  },
  {
    name: "Norbert Ratsirahonana",
    term: "1996-1997",
    republic: "Intérim",
    party: "Indépendant",
    image: "/norbert-ratsirahonana-portrait.jpg",
    bio: "Norbert Lala Ratsirahonana (né en 1938), juriste et ancien Premier ministre, a servi comme Président par intérim de la République de septembre 1996 à février 1997. Il a assumé la fonction suprême après la destitution d'Albert Zafy et a préparé l'élection présidentielle de 1996.",
  },
  {
    name: "Didier Ratsiraka",
    term: "1997-2002",
    republic: "Troisième République",
    party: "AREMA",
    image: "/didier-ratsiraka-second-term.jpg",
    bio: "Didier Ratsiraka est revenu au pouvoir en 1997 pour un second mandat. Cette période a été caractérisée par une libéralisation économique. Son second mandat s'est terminé dans la crise post-électorale de 2001-2002, conduisant à son exil en France.",
  },
  {
    name: "Marc Ravalomanana",
    term: "2002-2009",
    republic: "Troisième République",
    party: "TIM",
    image: "/marc-ravalomanana-portrait.jpg",
    bio: "Marc Ravalomanana (né en 1949), homme d'affaires, a été élu président en 2002. Il a géré le pays avec une approche d'entrepreneur axée sur la modernisation rapide et les réformes économiques. Son mandat a vu une augmentation des investissements étrangers, mais aussi une opposition croissante qui a mené à son renversement en mars 2009.",
  },
  {
    name: "Andry Rajoelina",
    term: "2009-2014",
    republic: "Transition",
    party: "TGV",
    image: "/andry-rajoelina-portrait.jpg",
    bio: "Andry Rajoelina (né en 1974), ancien maire d'Antananarivo, a pris le pouvoir en mars 2009 en tant que Président de la Haute Autorité de Transition (HAT). Cette période, non reconnue internationalement, a été marquée par des sanctions. Son gouvernement a cherché à stabiliser la situation politique en vue d'un retour à l'ordre constitutionnel.",
  },
  {
    name: "Hery Rajaonarimampianina",
    term: "2014-2018",
    republic: "Quatrième République",
    party: "HVM",
    image: "/hery-rajaonarimampianina-portrait.jpg",
    bio: "Hery Rajaonarimampianina (né en 1958), expert-comptable, a été élu président en 2013, marquant le retour du pays à l'ordre constitutionnel. Son mandat s'est concentré sur la reconstruction des infrastructures et la relance économique. Il a démissionné en 2018 pour se présenter à sa réélection, conformément à la Constitution.",
  },
  {
    name: "Andry Rajoelina",
    term: "2019-2025",
    republic: "Quatrième République",
    party: "IRD",
    image: "/andry-rajoelina-current-president.jpg",
    bio: "Andry Rajoelina est revenu au pouvoir en janvier 2019. Son second mandat est axé sur l'Initiative pour l'Émergence de Madagascar (IEM), le développement des infrastructures et la transformation économique et sociale. Cette période a été marquée par la gestion de la crise sanitaire et par d'importants défis sociaux et économiques.",
  },
  {
    name: "Michaël Randrianirina",
    term: "2025-Présent",
    republic: "Transition",
    party: "Militaire",
    image: "/Michaël-Randrianirina.png",
    bio: "Michaël Randrianirina a pris le pouvoir en 2025 à la suite d'une crise politique majeure. En tant que chef militaire, il dirige une transition vers un gouvernement civil.",
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
  { year: "2025", event: "Crise politique - Michaël-Randrianirina" },
]


function PresidentAccordionItem({ president, index }: { president: President; index: number }) {
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
  

  const accordionValue = president.name + index; 

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      
      <AccordionItem 
          value={accordionValue} 
          className="border border-border/50 rounded-xl overflow-hidden data-[state=open]:border-accent transition-all duration-300"
      >
        
      
        <AccordionTrigger 
           
            className="w-full text-left py-4 px-4 sm:px-6 hover:no-underline bg-card/50 backdrop-blur"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
            <img
              src={president.image || "/placeholder.svg"}
              alt={`Portrait of ${president.name}`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-accent/20 flex-shrink-0"
            />
            <div className="flex-1 space-y-1 min-w-0 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">{president.name}</h3>
              <p className="text-sm text-muted-foreground">{president.term}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-accent/90 text-accent-foreground">
                  {president.republic}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {president.party}
                </span>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent 
            className="p-4 sm:p-6 pt-0 border-t border-border/50 bg-background/50"
        >
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {president.bio}
          </p>
        </AccordionContent>
      </AccordionItem>
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
        <section className="max-w-3xl">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Cet article dresse la liste des présidents de la république de Madagascar depuis le 14 octobre 1958, date de
            la proclamation de la République malgache.
          </p>
        </section>

        <Accordion type="single" collapsible className="w-full space-y-4">
            {presidents.map((president, index) => (
                <PresidentAccordionItem 
                    key={index} 
                    president={president} 
                    index={index} 
                />
            ))}
        </Accordion>

        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frise Chronologique</h2>
          <Timeline />
        </section>

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

 
      <footer className="border-t border-border mt-16 bg-card/30">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
    
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
