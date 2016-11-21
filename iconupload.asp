<!--#INCLUDE FILE="includes/clsUpload.asp"-->

<%

Dim objUpload 
Dim strFile, strPath

' Instantiate Upload Class '
Set objUpload = New clsUpload
strFile = objUpload.Fields("icon-file").FileName
Response.Write(strFile)

strPath = server.mappath("temp") & "\" & strFile
Response.Write(strPath)

' Save the binary data to the file system '
objUpload("icon-file").SaveAs strPath
Set objUpload = Nothing

%>

<br />File has been saved in the file system.<br />
View this file:<br />
<a href="temp\<%=strFile%>">temp\<%=strFile%></a>
