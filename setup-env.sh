case $CIRCLE_BRANCH in
    "develop")
        export ENVIRONMENT="develop"
        export HEROKU_APP="hairsalons-develop"
        ;;
    "develop")
        export ENVIRONMENT="staging"
        export HEROKU_APP="hairsalons-stage"
        ;;
    "master")
        export ENVIRONMENT="production"
        export HEROKU_APP="hairsalons-production"
        ;;
esac
export NODE_ENV="production"