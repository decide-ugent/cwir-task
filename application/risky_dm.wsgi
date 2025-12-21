#!/var/www/cognitive_load/second_pilot_risky_DM/second_pilot_risky_DM_application/src/venv
activate_this = '/var/www/cognitive_load/risky_dm/application/src/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/cognitive_load/risky_dm/application/")

from src import app as application
application.secret_key = 'fhkjdskjgf(anything)'
