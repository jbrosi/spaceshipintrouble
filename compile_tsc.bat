
rem NOTE: This one is only for convenience. I'm not too familiar with windows scripting so I don't know how to do
rem       something like find |xargs in order to serve the tsc compiler all files at once. This should speed up
rem       the process and I'll fix that later :) for now it should work as is

SET CURDIR=%CD%

cd js
forfiles /s /p . /M *.ts /c "cmd /c echo @relpath && cd %CURDIR%\js && %HOMEDRIVE%%HOMEPATH%\AppData\Roaming\npm\tsc.cmd --module amd --sourcemap @relpath"

cd %CURDIR%