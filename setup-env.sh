case $CIRCLE_BRANCH in
    "develop")
        export ENVIRONMENT="develop"
        export HEROKU_APP="hairsalons-develop"
        ;;
    "master")
        export ENVIRONMENT="staging"
        export HEROKU_APP="hairsalons-com-stage"
        ;;
esac
export NODE_ENV="production"