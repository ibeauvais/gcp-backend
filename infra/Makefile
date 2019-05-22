export DEPLOY_PROJECT=${CURRENT_PROJECT}
export TERRAFORM_CMD = docker run -it --rm \
		-v `pwd`:/root/terraform \
		-v ~/.config/gcloud:/root/.config/gcloud \
		-w /root/terraform \
		hashicorp/terraform:0.11.7

export TF_VAR_current-project=${CURRENT_PROJECT}

init:
	# first to sync local repo with bucket state
	@$(TERRAFORM_CMD) init \
	  -backend-config="project=$(DEPLOY_PROJECT)" \
	  -backend-config="bucket=$(DEPLOY_PROJECT)-terraform-state-bucket"

plan apply destroy import show help refresh taint:
	# commands with parameters
	@echo "Working on environment: $$(cat .terraform/environment)"
	@if [ -d "vars" ]; then \
		conf="-var-file=vars/$$(cat .terraform/environment).tfvars";\
		fi;\
	$(TERRAFORM_CMD) $@ \
		 $$conf -var "current-project=$(DEPLOY_PROJECT)" \
		$(filter-out $@,$(MAKECMDGOALS))

fmt:
	#to lint all files
	@$(TERRAFORM_CMD) fmt .

$(workspaces):
	# enter make prod to switch to prod environment
	@$(TERRAFORM_CMD) workspace select $@

init_project:
	gcloud --project $(DEPLOY_PROJECT) deployment-manager \
    	  deployments update "init-project" --template init.jinja


%:
	@:

usage:
	@printf  "$$(grep -e '#\|:$$'  Makefile  | grep -v '%' | sed 's/\(.*\):$$/\\033\[1m \1 \\033[0m/g')\n"


.DEFAULT_GOAL := usage
.PHONY: plan apply destroy state import show help refresh graph usage lint workspace usage



