yarn --cwd projects/server rebuild
if [ $? -ne 0 ]; then
  echo "Rebuild failed. Please check the logs above for errors."
  exit $?
fi

yarn --cwd projects/app-client build
if [ $? -ne 0 ]; then
  echo "Rebuild failed. Please check the logs above for errors."
  exit $?
fi

node build.js
if [ $? -ne 0 ]; then
  echo "Build script failed. Please check the logs above for errors."
  exit $?
fi