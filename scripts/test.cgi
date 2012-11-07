#!/usr/bin/env python                                         

import sys, os
import cgi, json

print "Content-type: text/plain"
print

a = 1

result = dict(unco=a)

print json.dumps(result, sort_keys=True, indent=4)
