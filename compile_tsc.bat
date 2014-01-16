SET CURDIR=%CD%
SET TSCFILES=;
cd js
forfiles /s /p . /M *.ts /c "cmd /c echo @relpath && cd %CURDIR%\js && %HOMEDRIVE%%HOMEPATH%\AppData\Roaming\npm\tsc.cmd --module amd --sourcemap @relpath"

cd %CURDIR%