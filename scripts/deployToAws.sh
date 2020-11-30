rm -rf dist/*
npm run build
cd dist
aws s3 rm s3://moonshot-submission --recursive
aws s3 sync . s3://moonshot-submission