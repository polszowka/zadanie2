\# Zadanie 2



\## Opis



Opracowano workflow GitHub Actions budujący obraz Docker na podstawie plików `Dockerfile` oraz `server.js`.



Workflow realizuje następujące zadania:



\* budowa obrazu dla architektur `linux/amd64` oraz `linux/arm64`,

\* wykorzystanie cache Buildx przechowywanego w publicznym repozytorium Docker Hub (`cache-to` oraz `cache-from`, tryb `max`),

\* skanowanie obrazu przy użyciu Trivy,

\* publikacja obrazu do GHCR tylko w przypadku braku podatności HIGH i CRITICAL.



\## Tagowanie



Obrazy publikowane są z tagami:



\* `latest`

\* `sha-<hash\_commita>`



Cache przechowywany jest pod tagiem:



\* `buildcache`



Tag `latest` wskazuje najnowszą wersję obrazu, natomiast tag oparty o hash commit-a pozwala jednoznacznie powiązać obraz z konkretną wersją kodu źródłowego. Dla cache zastosowano stały tag `buildcache`, ponieważ przechowuje on warstwy wykorzystywane podczas budowania obrazów.



\## Potwierdzenie działania



Workflow został uruchomiony w GitHub Actions i poprawnie wykonał budowę obrazu oraz skan bezpieczeństwa Trivy.



