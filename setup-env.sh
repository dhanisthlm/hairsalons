case $CIRCLE_BRANCH in
    "develop")
        export ENVIRONMENT="dev"
        export HEROKU_APP="nordrum-com-develop"
        ;;
    "master")
        export ENVIRONMENT="production"
        export HEROKU_APP="nordrum-com-stage"
        ;;
esac
export NODE_ENV="production"