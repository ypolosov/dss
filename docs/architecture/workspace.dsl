workspace "add-ai" "Architecture documentation and C4 model. Source: Business Architecture (Confluence G). L1/L2 from PlantUML." {
    !impliedRelationships false

    model {
        platformAdmin = person "Platform Admin" "Manages platform."
        platformEmployee = person "Platform Employee" "Platform staff."
        operatorAdmin = person "Operator Admin" "Manages operator tenant."
        operatorEmployee = person "Operator Employee" "Operator staff."
        player = person "Player" "End-user (B2C)."
        visitor = person "Visitor" "Casino visitor."
        developer = person "Developer" "Develops platform."
        devops = person "DevOps" "DevOps engineer."
        designer = person "Designer" "UI/UX designer."
        tester = person "Tester" "QA engineer."
        platformOwner = person "Platform Owner" "Manages platform and tenants."
        operator = person "Operator" "Gambling operator; manages tenant and casinos."

        extDns = softwareSystem "DNS & CDN Provider API" "External DNS and CDN." "External"
        extGames = softwareSystem "Games Provider API" "External games provider." "External"
        extPay = softwareSystem "Payments Provider API" "External payments." "External"
        extFraud = softwareSystem "Fraud Detection Provider API" "External fraud detection." "External"
        extKyc = softwareSystem "KYC Provider API" "External KYC." "External"
        extAml = softwareSystem "AML Provider API" "External AML." "External"
        extCs = softwareSystem "Customer Support Provider API" "External customer support." "External"
        extSecrets = softwareSystem "Shared Secrets" "Hashicorp Vault." "External"
        extContainerRegistry = softwareSystem "Container Registry" "Managed cloud registry." "External"
        extRegistry = softwareSystem "Registry" "Nexus." "External"
        extObservability = softwareSystem "Shared Observability" "Grafana stack." "External"

        main = softwareSystem "Gambling Platform" "B2B2C SaaS for Operators to manage and deploy B2C Casinos under unique Brands. MVP 1 year." {
            !docs "docs"
            !adrs "adrs" madr

            platformInfra = container "Platform Infrastructure" "Shared: Gateway, CI/CD, Platform CRM, Events bus, IAM, Reports." "Nest.js" {
                platGateway = component "Gateway" "API gateway." "Traefik"
                platEvents = component "Events" "Event processing." "Argo Events"
                platCi = component "CI" "CI pipelines." "Argo Workflows"
                platCd = component "CD" "CD automation." "ArgoCD"
                platImageUpdater = component "Image-updater" "Image updates." "Argo Image Updater"
                platSmtp = component "SMTP" "Mail." "Mailu"
                platImages = component "Images" "Image processing." "imgProxy"
                platCerts = component "Certificates" "TLS certs." "Cert-Manager"
                platConfigs = component "Configs" "Feature flags." "OpenFeature"
                platSecrets = component "Secrets" "Secrets store." "Hashicorp Vault"
                platMetrics = component "Metrics" "Metrics collection." "vmagent"
                platLogs = component "Logs" "Log aggregation." "Promtail"
                platTraces = component "Traces" "Distributed tracing." "Tempo"
                platErrors = component "Errors" "Error tracking." "Sentry"
                platProfiles = component "Profiles" "Profiling." "Grafana Alloy"
                platCollector = component "Collector" "OTel collector." "OTel Collector"
                platOperatorInt = component "Operator Integration" "Sync to operator." "MirrorMaker2"
                platCasinoInt = component "Casino Integration" "Sync to casino." "MirrorMaker2"
                platBus = component "Bus" "Message bus." "Kafka"
                platGateway -> platEvents "Routes" "HTTPS"
                platGateway -> platCi "Routes" "HTTPS"
                platGateway -> platCd "Routes" "HTTPS"
                platGateway -> platImageUpdater "Routes" "HTTPS"
                platGateway -> platSmtp "Routes" "SMTP"
                platGateway -> platImages "Routes" "HTTPS"
                platGateway -> platCerts "Routes" "HTTPS"
                platGateway -> platConfigs "Routes" "HTTPS"
                platGateway -> platSecrets "Routes" "API"
                platGateway -> platMetrics "Routes" "HTTPS"
                platGateway -> platLogs "Routes" "HTTPS"
                platGateway -> platTraces "Routes" "HTTPS"
                platGateway -> platErrors "Routes" "API"
                platGateway -> platProfiles "Routes" "HTTPS"
                platGateway -> platCollector "Routes" "OTLP"
                platGateway -> platBus "Routes" "HTTPS"
                platBus -> platOperatorInt "Feeds" "Kafka"
                platBus -> platCasinoInt "Feeds" "Kafka"
            }

            operatorTenant = container "Operator Tenant" "Per-tenant backoffice: Gateway, Operator CRM, Events bus, IAM, Reports." "Next.js, Refine" {
                opGateway = component "Gateway" "API gateway." "Traefik"
                opCrm = component "CRM" "Operator backoffice." "Next.js, Nest.js"
                opReports = component "Reports" "Reporting." "Nest.js"
                opIam = component "IAM" "Identity and access." "Keycloak"
                opCasinoInt = component "Casino Integration" "Sync to casino." "MirrorMaker2"
                opBus = component "Bus" "Message bus." "Kafka"
                opGateway -> opCrm "Routes" "HTTPS"
                opGateway -> opReports "Routes" "HTTPS"
                opGateway -> opIam "Routes" "HTTPS"
                opGateway -> opBus "Routes" "HTTPS"
                opCrm -> opIam "Uses" "API"
                opCrm -> opBus "Publishes" "Kafka"
                opReports -> opIam "Uses" "API"
                opReports -> opBus "Publishes" "Kafka"
                opBus -> opCasinoInt "Feeds" "Kafka"
            }

            casino = container "Casino" "Per-brand B2C: Gateway, Brand, IAM, CMS, Events bus, Games/Payments/AML/KYC/Affiliations/Fraud integrations." "Next.js" {
                casGateway = component "Gateway" "API gateway." "Traefik"
                casBrand = component "Brand" "B2C web app." "Next.js, Nest.js"
                casIam = component "IAM" "Identity and sessions." "Keycloak"
                casCms = component "CMS" "Content management." "Payload"
                casBus = component "Bus" "Message bus." "Kafka"
                casKyc = component "KYC Integration" "KYC provider integration." "Nest.js"
                casAml = component "AML Integration" "AML provider integration." "Nest.js"
                casFraud = component "Fraud Integration" "Fraud detection integration." "Nest.js"
                casGames = component "Games Integration" "Games provider integration." "Nest.js"
                casPayments = component "Payments Integration" "Payments integration." "Nest.js"
                casGateway -> casBrand "Routes" "HTTPS"
                casGateway -> casIam "Routes" "HTTPS"
                casGateway -> casCms "Routes" "HTTPS"
                casGateway -> casBus "Routes" "HTTPS"
                casBrand -> casBus "Publishes" "Kafka"
                casKyc -> casBus "Publishes" "Kafka"
                casAml -> casBus "Publishes" "Kafka"
                casFraud -> casBus "Publishes" "Kafka"
                casGames -> casBus "Publishes" "Kafka"
                casPayments -> casBus "Publishes" "Kafka"
                casKyc -> extKyc "Uses" "API"
                casAml -> extAml "Uses" "API"
                casFraud -> extFraud "Uses" "API"
                casGames -> extGames "Uses" "API"
                casPayments -> extPay "Uses" "API"
            }

            platformInfra -> operatorTenant "Hosts" "Platform API"
            operatorTenant -> casino "Hosts" "Tenant API"
        }

        platformAdmin -> main "Manages" "Web Browser"
        platformEmployee -> main "Manages" "Web Browser"
        platformOwner -> main "Manages" "Web Browser"
        operatorAdmin -> main "Manages" "Web Browser"
        operatorEmployee -> main "Manages" "Web Browser"
        player -> main "Uses" "Web Browser"
        visitor -> main "Uses" "Web Browser"
        developer -> main "Develops" "IDE"
        devops -> main "Maintains" "CLI"
        designer -> main "Designs" "Design tools"
        tester -> main "Tests" "Test tools"
        operator -> main "Manages" "Web Browser"

        main -> extDns "Uses" "HTTPS"
        main -> extCs "Uses" "API"
        main -> extGames "Uses" "API"
        main -> extPay "Uses" "API"
        main -> extKyc "Uses" "API"
        main -> extAml "Uses" "API"
        main -> extFraud "Uses" "API"
        platformInfra -> extSecrets "Uses" "API"
        platformInfra -> extContainerRegistry "Uses" "API"
        platformInfra -> extRegistry "Uses" "API"
        platformInfra -> extObservability "Uses" "API"
    }

    views {
        systemLandscape "SystemLandscape" "Landscape: persons and Gambling Platform." {
            include *
            autoLayout
        }
        systemContext main "SystemContext_L1" "L1: System context (persons, platform, external systems)." {
            include *
            autoLayout
        }
        container main "Containers" "First-level decomposition: Platform Infrastructure, Operator Tenant, Casino." {
            include *
            autoLayout
        }
        container main "Containers_Platform" "Platform Infrastructure container." {
            include platformInfra
            autoLayout
        }
        container main "Containers_Operator" "Operator Tenant container." {
            include operatorTenant
            autoLayout
        }
        container main "Containers_Casino" "Casino container." {
            include casino
            autoLayout
        }
        component platformInfra "Components_Platform" "Platform Infrastructure components (L2)." {
            include *
            autoLayout
        }
        component operatorTenant "Components_Operator" "Operator Tenant components (L2)." {
            include *
            autoLayout
        }
        component casino "Components_Casino" "Casino components (L2)." {
            include *
            autoLayout
        }
    }

    configuration {
        scope softwaresystem
    }

    !docs "docs"
    !adrs "adrs" madr
}
