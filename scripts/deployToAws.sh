npm run build
cd dist
aws s3 sync . s3://moonshot-submission