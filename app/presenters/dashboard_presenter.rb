class DashboardPresenter < Presenter

	TENANTS_LIST = %w(SamuelLJackson  JohnMalkovich  BradPitt  RichardGere  TobeyMaguire  VinDiesel  MartinLawrence  JohnTravolta  JimCarrey
		  JohnGoodman  AdamSandler  AlfredMolina  MarkWahlberg ArnoldSchwarzenegger  EdwardNorton  DanielRadCliffe  LukeWilson
			MeganFox  AlecBaldwin  MerylStreep  JohnCusack  EmilyBlunt  CharlizeTheron  RobertDuvall  JonVoight
			AndyGarcia  BruceWillis  TomHanks  DennisQuaid  GeorgeClooney  KirstenDunst  AnnaFaris  AmandaPeet  EddieMurphy
			GwynethPaltrow  DonCheadle  RobinWilliams  TomCruise  AlPacino  PaulBettany  KateBeckinsale  PenelopeCruz  MegRyan
			NicoleKidman EdHarris  TommyLeeJones  DustinHoffman  RachelMcAdams  DanielDay-Lewis JenniferLoveHewitt  AndieMacDowell
		  SandraBullock  ReeseWitherspoon  BillyBobThorton  JessicaBiel  SigourneyWeaver  HalleBerry  JessicaAlba
		  ElizabethBanks  BillyCrystalBryceDallasHoward  SteveMartin  ChristianBale  JeremyIrons  CameronDiaz  KevinSpacey
			KevinKostner  BillMurray  MichaelDouglas  LiamNeeson  JohnnyDepp  ScarlettJohansson  KateWinslet  OliviaWilde
			DanielCraig  RobSchneider  angelinaJolie  EmmaStone  EmmaThompson  TedDanson  JamesGandolfini  CaseyAffleck
			HeatherLocklear  AnnaKendrick  ReneeZellweger  TomWilkinson  KevinKline  MaggieGrace  KatieHolmes
			SteveMcQueen  LeonardoDiCaprio  JeffBridges  KirstieAlley  WillFerrell  HilaryDuff  DrewBarrymore  GaryOldman
			EmbethDavidtz  LeslieMann  PaulNewman  EvangelineLilly  NaomiWatts JasonBiggs  MenaSuvari  JasonStatham  GlennClose
			SalmaHayek  DonaldSutherland  CateBlanchett  RalphFiennes  KeiraKnightley  JamesStewart  WoodyHarrelson DannyDeVito
			RussellCrowe  PaulWalker  HeathLedger  ClintEastwood  SylvesterStallone  MorganFreeman  AmyAdams  AnthonyHopkins  WillSmith  AliciaSilverstone
			MattDamon  SethGreen  SamNeil  PaulDano  SteveZahn  ChristopherPlummer  MickeyRourke  SusanSarandon  TimothyOlyphant  RainnWilson  NicolasCage
			JamesFranco  HarrisonFord  JakeGyllenhaal  JudeLaw  TimMeadows  DemiMoore  CatherineKeener  BenAffleck  AnneHathaway  MelGibson  JackNicholson  MarisaTomei  EvaMendes
			RayLiotta  JuliaRoberts  ChristopherWalken  VinceVaughn  CliveOwen  JenniferGarner  BridgetteWilson-Sampras  SteveCarell  SarahMichelleGellar  CatherineZeta-Jones
			JamesRemar  JackBlack  ClaireForlani  StanleyTucci  RyanReynolds  JamieLeeCurtis  EwanMcGregor  BenStiller  ChristinaRicci  RachelWeisz  RowanAtkinson
			PaulGiamatti  LuisGuzman  EvaLongoria  ElizaDushku  EmileHirsch  MichaelCaine  JamesWoods  ClaireDanes  SeanPenn  AlanArkin  WillemDafoe
			JodieFoster  ToniCollette  MargHelgenberger  MichellePfeiffer  BlakeLively  KeanuReeves  JenniferConnelly  ValKilmer  GeneHackman
			RobertRedford  AntonioBanderas  HankAzaria  AshleyJudd  KristinScottThomas  OwenWilson  QueenLatifah  StellanSkarsgard  ElishaCuthbert
			JeanClaudeVanDamme  TeaLeoni  JackieChan  JenniferAniston  JosephGordonLevitt  DenzelWashington  ColinFarrell  MandyMoore
			CarrieAnneMoss  CubaGoodingJr)

	def tenants
		@tenants ||= Tenant.where("date_out is null or date_out > '2014-05-02'").map { |tenant| TenantPresenter.new(h, tenant)}
	end

	def possible_bills_names
		possible_bills.map{|x| x[0]}
	end

	def possible_bills
		@list ||= {"water" => "#03BAF6", "gas" => "#CC0000", "power" => "#8bbc21"}
	end

	def tenant_sample_image
		"https://dl.dropboxusercontent.com/u/2001692/actor/#{TENANTS_LIST.sample}.jpg"
	end

end