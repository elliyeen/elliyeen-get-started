# ── Milano Family Pizza Revenue Audit — Render Script ────────────────────────
# Run from inside the reports/ directory:
#   cd reports && Rscript render.R
#
# Output: reports/milano-audit.html
# ─────────────────────────────────────────────────────────────────────────────

here <- normalizePath(".")

message("── Checking and installing required packages ──────────────────────────────")

pkgs <- c(
  "rmarkdown",   # R Markdown rendering
  "knitr",       # code chunks
  "ggplot2",     # charts (Tufte-faithful)
  "dplyr",       # data wrangling
  "tidyr",       # reshaping
  "scales",      # axis formatting
  "kableExtra",  # styled tables
  "ggrepel"      # non-overlapping labels on priority matrix
)

missing <- pkgs[!pkgs %in% installed.packages()[, "Package"]]

if (length(missing) > 0) {
  message("Installing: ", paste(missing, collapse = ", "))
  install.packages(missing, repos = "https://cloud.r-project.org", quiet = TRUE)
} else {
  message("All packages already installed.")
}

message("── Rendering report ───────────────────────────────────────────────────────")

rmarkdown::render(
  input       = file.path(here, "milano-audit.Rmd"),
  output_file = "milano-audit.html",
  output_dir  = here,
  quiet       = FALSE
)

out_path <- file.path(here, "milano-audit.html")

if (file.exists(out_path)) {
  size_kb <- round(file.size(out_path) / 1024, 0)
  message("\n── Report generated ──────────────────────────────────────────────────────")
  message("   File:  ", out_path)
  message("   Size:  ", size_kb, " KB")
  message("")
  message("   View:     Open milano-audit.html in any browser")
  message("   PDF:      Browser → Print (Cmd+P) → Save as PDF")
  message("   Share:    Drag .html to drop.netlify.com for a live URL")
  message("─────────────────────────────────────────────────────────────────────────")
} else {
  stop("Render failed — output file not found.")
}
