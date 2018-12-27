case $CIRCLE_BRANCH in
    "develop")
        export ENVIRONMENT="dev"
        export HEROKU_APP="hairsalons-develop"
        ;;
    "stage")
        export ENVIRONMENT="staging"
        export HEROKU_APP="hairsalons-stage"
        ;;
    "master")
        export ENVIRONMENT="production"
        export HEROKU_APP="hairsalons-production"
        ;;