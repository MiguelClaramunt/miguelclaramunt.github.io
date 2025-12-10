UV ?= uv
CV_INPUT := _data/cv.yml
CV_OUTPUT := assets/pdf/cv.pdf
RENDERCV_OUTPUT_DIR := _data/rendercv_output

.PHONY: render
render: ## Build the PDF CV via rendercv and clean temporary artifacts.
	@mkdir -p "$(abspath $(dir $(CV_OUTPUT)))"
	$(UV) run rendercv render "$(abspath $(CV_INPUT))" -pdf "$(abspath $(CV_OUTPUT))"
	rm -rf "$(abspath $(RENDERCV_OUTPUT_DIR))"
