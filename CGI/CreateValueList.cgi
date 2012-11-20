#!/usr/bin/env python
from emlsupport import *
import ecell, ecell.emc, ecell.ecs, ecell.Session
import sys, os, array, json, time, random, cgi
import xml.sax.saxutils
from pprint import pprint


# Get and parse a query string
query_string_key = 'QUERY_STRING'
if query_string_key in os.environ:
    query = cgi.parse_qs(os.environ[query_string_key])
else:
    query = {}

ID = ""

# Get and escape a MESSAGE
message_key = 'ID'
if message_key in query:
    ID = cgi.escape(query[message_key][0])

name = str( int(time.time() % 1296000) * 10 + int(random.random()) + 1048576 )

os.mkdir("./results/" + name)
os.system("cp ./models/" + ID + " ./results/" + name + "/" + name + ".em")
##os.system("cp ./models/" + ID + ".em ./results/" + name + "/" + name + ".em")
##os.system("/usr/local/bin/ecell3-em2eml --outfile=./results/" + name + "/" + name   " ./results/" + name + "/" + name  )
os.system("/usr/local/bin/ecell3-em2eml --outfile=./results/" + name + "/" + name + ".eml ./results/" + name + "/" + name + ".em")
f = open("./results/" + name + "/history.txt", 'w+')

anEMLFileName = "./results/" + name + "/" + name + ".eml"
aSimulator = ecell.emc.Simulator()
aSession = ecell.Session.Session(aSimulator)
aSession.loadModel(anEMLFileName)

anEmlSupport = EmlSupport(anEMLFileName)
variable = []

line = ""
for anID in anEmlSupport.getVariableList():
    Value     = aSession.theSimulator.getEntityProperty('Variable:' + anID + ':Value')
    MolarConc = aSession.theSimulator.getEntityProperty('Variable:' + anID + ':MolarConc')

    (Path, ID) = anID.split(':')
    variable.append([ID, Path, Value, MolarConc])

# written by Duke
    line = line + str(Path) +"/"+ str(ID) + "\t" + "0\t" +"0\t"+ str(Value) +"\t"+ str(MolarConc) + "\n"

if os.path.exists("PathDataSet.txt"):
    ft = open("PathDataSet.txt", "a")
#    ft.write(line)
    ft.close()

else:
    ff = open("PathDataSet.txt", "w")
    ff.write(line)
    ff.close()
    ff2 = open("saishin.txt", "w")
    ff2.write(line)
    ff2.close()


# Path -> /CELL/CYTOPLASM
# ID   -> AK
# anID -> /CELL/CYTOPLASM:AK

process = []
for anID in anEmlSupport.getProcessList():
    Activity      = aSession.theSimulator.getEntityProperty('Process:' + anID + ':Activity')
    MolarActivity = aSession.theSimulator.getEntityProperty('Process:' + anID + ':MolarActivity')
    ClassName     = aSession.theSimulator.getEntityClassName('Process:' + anID)

    if ClassName == "ExpressionFluxProcess":
        Expression  = aSession.theSimulator.getEntityProperty('Process:' + anID + ':Expression')
    else:
        Expression = "hoge"
        
    VariableReferenceList = ', '.join(['[' + ', '.join([str(ll) for ll in l]) + ']' for l in aSession.theSimulator.getEntityProperty('Process:' + anID + ':VariableReferenceList')])
#    VariableReferenceList    = aSession.theSimulator.getEntityProperty('Process:' + anID + ':VariableReferenceList')

    (Path, ID) = anID.split(":")
    process.append([ID, Path, Activity, MolarActivity, ClassName, Expression, VariableReferenceList])


result = dict(ID=name, Variable=variable, Process=process)

print "Content-Type: text/plain"
print
print json.dumps(result, sort_keys=True, indent=4)

sys.exit()
