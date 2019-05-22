locals {
  api = ["compute.googleapis.com"]
}

resource "google_project_service" "project" {
  count   = "${length(local.api)}"
  project = "${data.google_project.project.project_id}"
  service = "${element(local.api, count.index)}"

  disable_dependent_services = true
}
