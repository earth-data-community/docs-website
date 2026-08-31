---
title: "Resource catalogue"
date: 2026-08-26
draft: false
weight: 2
---

# Resource catalogue
The Node Resource Catalogue has adopted a foundational design choice based on a unified catalogue model built on DCAT. In this approach, every resource is exposed as a dcat:Resource, while its specific nature is indicated via the dcterms:type property. Datasets are additionally typed as dcat:Dataset to ensure full DCAT-AP compliance, whereas other resource types (e.g. Software, Publications, Services, etc.) are represented solely through dcterms:type, linked to a controlled SKOS vocabulary. Data harvesting is performed through a dedicated component provided by the French Gaia Data project (MTEP). In parallel, specific connectors are being developed to aggregate additional categories of research outputs, including CodeMeta for software, DataCite for publications, and GeoDCAT-AP for geospatial data and services.  A key advancement is the design of an intelligent EOSC connector acting as a local quality gate. Before any metadata is exposed to the EOSC EU Node (EEN), it undergoes strict validation ensuring the presence of mandatory Persistent Identifiers (PIDs), licenses, and core metadata fields. This mechanism guarantees a “zero rejection” policy by the European Knowledge Graph. The system is designed to preserve rich, domain-specific metadata locally (e.g. spatial and temporal extent, fine-grained provenance) while projecting only a strictly compliant subset to the EEN. Finally, metadata records are enriched through a combination of rule-based processing and AI-assisted enrichment techniques.


<em>More coming soon</em>