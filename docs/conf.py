# -*- coding: utf-8 -*-

from __future__ import division, print_function, unicode_literals

from datetime import datetime

from recommonmark.parser import CommonMarkParser

def setup(app):
    app.add_stylesheet('css/style.css')

extensions = []
templates_path = ['/home/docs/checkouts/readthedocs.org/readthedocs/templates/sphinx', 'templates', '_templates', '.templates']
source_suffix = ['.rst']
source_parsers = {
            '.md': CommonMarkParser,
        }
master_doc = 'index'
project = u'Liquidity SDK'
copyright = str(datetime.now().year)
version = 'latest'
release = 'latest'
exclude_patterns = ['_build']
pygments_style = 'sphinx'
htmlhelp_basename = 'liquidity-sdk'
html_theme = 'sphinx_rtd_theme'
file_insertion_enabled = False
latex_documents = [
  ('index', 'liquidity-sdk.tex', u'Liquidity SDK Documentation',
   u'', 'manual'),
]

