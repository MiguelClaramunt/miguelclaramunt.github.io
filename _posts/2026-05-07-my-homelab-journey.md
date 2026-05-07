---
layout: post
title: "5 Months of Homelabbing: Lessons Learnt"
date: 2026-05-07
description: "Reflections on repurposing a decade-old gaming PC as a server, experience earned and the practical challenges of maintaining a private cloud."
tags: homelab truenas self-hosting open-source
pretty_table: true
toc:
  beginning: true
---

I've been tinkering with computers since I was practically a baby, but this specific machine holds a special place: at 13 years old, I begged my parents for a computer, and when they finally agreed, I chose every part and built it myself. It served as my primary machine through high school until I eventually moved to a laptop for high school, university and work.

Even when I moved to Barcelona in 2022, this desktop came with me. However, as life got busier, it sat unused, slowly collecting dust. Eventually, I decided to take it back to my parents' house, where I had a proper environment to set it up as a dedicated server (especially since TrueNAS requires a stable ethernet connection to function correctly).

The server has now been running for 5 months, after I officially kicked it off as a Christmas project. It has been a remarkably successful journey in self-hosting and digital sovereignty. After evaluating various Operating Systems like [Proxmox](https://www.proxmox.com/) (too virtualization-heavy for my needs) and [Unraid](https://unraid.net/), I settled on [TrueNAS](https://www.truenas.com/). It is free, robust, and perfectly tailored for my primary use case: secure data management and containerized services.

### Featured Services

While the lab hosts many tools, there are a few I find myself using daily:

- [**Navidrome**](https://www.navidrome.org/): My primary music streaming server, allowing me to carry my entire personal library wherever I go.
- **adevenv:** A custom remote development environment based on [**Docker-in-Docker**](https://docs.docker.com/resources/design/engine/docker-in-docker/). This setup was born out of necessity: I was in the middle of migrating my main laptop from Windows to Linux, which stalled many of my Docker-based projects. By moving my development environment to a server, I no longer have to worry about downtime. I can just log in from the browser and focus entirely on writing and customizing this site.

## Hardware Specifications

- **CPU:** Intel Core i7-4790 @ 3.60GHz
- **Motherboard:** Asus Z97-C
- **RAM:** 16GB DDR3
- **Power Supply:** EVGA Supernova 750GA (750W 80 Plus Gold Modular)
- **Storage Strategy:**
  - **Main:** 1TB SATA SSD (High performance for active services)
  - **Local Mirror:** 1TB HDD (Data is replicated from the SSD for local redundancy)
  - **Cloud Offsite:** Encrypted backups to Google Drive for disaster recovery.

## Efficiency & Power Consumption

One concern with older hardware is power efficiency. While the i7-4790 has a **TDP of 84W**, the actual consumption is much lower because most services remain idle until accessed.

Furthermore, the **EVGA Gold-rated power supply** operates at peak efficiency when the load is around 15-40%, which aligns perfectly with the server's typical draw.

Telemetry from a one-month period shows the system is remarkably efficient: with a mean CPU usage of only **2.47%** and a mean system load average of **0.3**, the server is utilizing less than **4% of its 8-thread capacity** on average.

### Cost Analysis & Cloud Comparison

At these low load levels, the system draws significantly less than its peak. Estimating an average idle/low-load draw of ~40W for the whole system (including disks and fans) at a cost of **0.2€/kWh**:

- **Daily Consumption:** ~0.96 kWh
- **Daily Cost:** ~0.19 €
- **Monthly Cost:** ~5.76 €

To put this in perspective, a commercial Virtual Private Server (VPS) with similar specifications (16GB RAM, 4 vCPUs, and 1TB SSD) would cost significantly more:

| Provider              | vCPU / RAM    | Storage           | Est. Monthly Cost         |
| :-------------------- | :------------ | :---------------- | :------------------------ |
| **Homelab (This PC)** | 4C/8T / 16GB  | 1TB SSD + 1TB HDD | **~5.76 €** (Electricity) |
| **Contabo**           | 6 vCPU / 18GB | 1TB SSD           | ~14.00 €                  |
| **Hetzner**           | 8 vCPU / 16GB | 1TB SSD (Block)   | ~73.00 €                  |
| **DigitalOcean**      | 8 vCPU / 16GB | 1TB SSD (Block)   | ~160.00 €+                |

Beyond the raw savings, the homelab provides **"Bare Metal" performance** without shared resources, a secondary 1TB HDD for local backups that would cost even more in the cloud, and the absolute privacy of keeping data within my own four walls.

## Deployed Applications

Currently, I have the following applications running in my lab:

| Application                                                  | Description                                          |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| **adevenv**                                                  | Development environment for various projects.        |
| [**AFFiNE**](https://affine.pro/)                            | Knowledge base and project management tool.          |
| [**authentik**](https://goauthentik.io/)                     | Identity provider and SSO solution.                  |
| [**BentoPDF**](https://github.com/bento-pdf/bento-pdf)       | Web-based PDF manipulation tools.                    |
| [**cloudflared**](https://github.com/cloudflare/cloudflared) | Cloudflare Tunnel for secure remote access.          |
| [**Immich**](https://immich.app/)                            | High-performance self-hosted photo and video backup. |
| [**Navidrome**](https://www.navidrome.org/)                  | Music streaming server for my personal library.      |
| [**Paperless-ngx**](https://docs.paperless-ngx.com/)         | Document management system for a paperless office.   |
| [**Tailscale**](https://tailscale.com/)                      | Mesh VPN based on WireGuard for secure networking.   |

## Next Steps

While the server is stable, I am constantly looking to improve its security and usability. My immediate focus is on:

- **Full SSL/TLS Integration:** I plan to use [**Cloudflare**](https://www.cloudflare.com/) to manage certificates and provide secure HTTPS connections for both the **TrueNAS WebUI** and **adevenv**.
- **Advanced Identity Management:** I aim to refine my [**authentik**](https://goauthentik.io/) setup to achieve true **Single Sign-On (SSO)** across all deployed services. A key goal is to eliminate redundant logins; currently, accessing services from outside the network via **Cloudflare Access** sometimes results in "double authentication" (once for the tunnel and again for the service). I am working on integrating these layers so that a single identity check is sufficient.
- **Improved Service Routing with Traefik:** I plan to migrate my reverse proxy setup for **adevenv** to [**Traefik**](https://traefik.io/) (utilizing the instance already running on TrueNAS). I tried (unsuccessfully) setting up Nginx on the stack, likely due to port mapping conflicts with the existing Traefik setup. My goal is to move away from exposing individual ports for each service—a practice that currently poses a security risk—and instead use a unified, label-based routing system.
- **Automated Service Updates:** Many of the services I host receive almost daily updates. I plan to implement an automation pipeline to handle these updates periodically, ensuring that I am always running the latest features and security patches without the need for constant manual intervention.
- **Proactive Monitoring & Alerting:** I intend to set up a comprehensive monitoring system to track the health and uptime of all deployed services. By implementing an alerting system (via email or a similar service), I will be notified immediately of any service failures, allowing me to restore them quickly and maintain high availability for my lab.

## Conclusions

Building this server has opened an entirely new world for me. Instead of looking for paid or proprietary hosted services, my first instinct is now to search for self-hosted, open-source alternatives. This shift has not only given me more control over my digital life but has also made me a more active participant in the open-source community.

If you are considering starting your own adventure into homelabbing, I really encourage you to do it. You don't need expensive server racks or the latest hardware to begin; a simple, old laptop is more than enough. Many systems, including TrueNAS, can run on very modest equipment. The real value isn't in the specs, but in the experience of tinkering, learning, and finally owning your own data.
