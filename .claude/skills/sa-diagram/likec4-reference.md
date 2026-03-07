# LikeC4 DSL Quick Reference

## Specification (element & relation kinds)

```likec4
specification {
  element person {
    style {
      shape person
      color amber
    }
  }
  element softwareSystem {
    style {
      shape rectangle
      color blue
    }
  }
  element container {
    style {
      shape rectangle
      color green
    }
  }
  element component {
    style {
      shape rectangle
      color slate
    }
  }
  element database {
    style {
      shape storage
      color red
    }
  }
  element queue {
    style {
      shape queue
      color purple
    }
  }

  relationship async {
    style {
      line dashed
      color gray
    }
  }
  relationship sync {
    style {
      line solid
      color blue
    }
  }
}
```

## Model

```likec4
model {
  customer = person "Customer" {
    description "End user of the platform"
  }

  gtPlatform = softwareSystem "GT Platform" {
    description "Online gambling platform"

    webApp = container "Web Application" {
      description "SPA frontend"
      technology "React"
    }

    apiGateway = container "API Gateway" {
      description "API entry point"
      technology "NestJS"
    }

    database = database "Database" {
      description "Primary data store"
      technology "PostgreSQL"
    }

    // Relationships inside the system
    webApp -> apiGateway "Uses" { style sync }
    apiGateway -> database "Reads/Writes" { style sync }
  }

  // External relationships
  customer -> gtPlatform.webApp "Uses" { style sync }
}
```

## Views

```likec4
views {
  view systemContext of gtPlatform {
    title "GT Platform - System Context"
    include *
  }

  view containers of gtPlatform {
    title "GT Platform - Containers"
    include *
    include customer
  }

  view components of gtPlatform.apiGateway {
    title "API Gateway - Components"
    include *
  }
}
```

## Style Options
- **shape**: rectangle, person, storage, queue, cylinder, browser, mobile
- **color**: amber, blue, green, red, purple, slate, gray, indigo, sky, emerald
- **line**: solid, dashed, dotted
- **opacity**: 0-100
