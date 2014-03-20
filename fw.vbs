Option Explicit

Const NET_FW_PROFILE_DOMAIN = 0
Const NET_FW_PROFILE_STANDARD = 1
Const NET_FW_SCOPE_ALL = 0

Const NET_FW_IP_PROTOCOL_UDP = 17
Const NET_FW_IP_PROTOCOL_TCP = 6

' IP Version – ANY is the only allowable setting for now
Const NET_FW_IP_VERSION_ANY = 2

Dim errornum
'msgbox "at 1"

' Create the firewall manager object.
Dim fwMgr
Set fwMgr = CreateObject("HNetCfg.FwMgr")

' Get the current profile for the local firewall policy.
Dim profile
Set profile = fwMgr.LocalPolicy.CurrentProfile

Dim app
Set app = CreateObject("HNetCfg.FwAuthorizedApplication")
'app.ProcessImageFileName = "%PROGRAMFILES%\MP3-Xtreme 5.0\mp3-xtreme.exe"
'app.ProcessImageFileName = "C:\Program Files (x86)\MP3-Xtreme 6.0\mp3-xtreme.exe"

Dim InstallDir
InstallDir = Session.Property("CustomActionData") & "mp3-xtreme.exe"
'msgbox InstallDir
app.ProcessImageFileName = InstallDir 

app.Name = "MP3-Xtreme 6.0"
app.Scope = NET_FW_SCOPE_ALL
app.IpVersion = NET_FW_IP_VERSION_ANY
app.Enabled = TRUE

Dim port
Set port = CreateObject("HNetCfg.FWOpenPort")
port.Name = "TCP port 6881"
port.Protocol = NET_FW_IP_PROTOCOL_TCP
port.Port = 6881
port.Scope = NET_FW_SCOPE_ALL
port.Enabled = TRUE

Dim port2
Set port2 = CreateObject("HNetCfg.FWOpenPort")
port2.Name = "UDP port 6881"
port2.Protocol = NET_FW_IP_PROTOCOL_UDP
port2.Port = 6881
port2.Scope = NET_FW_SCOPE_ALL
port2.Enabled = TRUE

On Error Resume Next
errornum = 0
profile.AuthorizedApplications.Add app

'profile.GloballyOpenPorts.Add port
'profile.GloballyOpenPorts.Add port2
errornum = Err.Number
'if errornum <> 0 then Wscript.Echo("Adding authorized application failed with: " & errornum)



