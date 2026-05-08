UV ?= uv
DOCKER_COMPOSE ?= docker compose
CV_INPUT := _data/cv.yml
CV_OUTPUT := assets/pdf/cv.pdf
RENDERCV_OUTPUT_DIR := _data/rendercv_output

.PHONY: render up
render: ## Build the PDF CV via rendercv and clean temporary artifacts.
	@mkdir -p "$(abspath $(dir $(CV_OUTPUT)))"
	$(UV) tool run --python 3.13 --from "rendercv[full]>=2.8" rendercv render "$(CV_INPUT)" -pdf "../$(CV_OUTPUT)"
	rm -rf "$(abspath $(RENDERCV_OUTPUT_DIR))"

up: ## Start the website locally via docker compose.
	$(DOCKER_COMPOSE) up
