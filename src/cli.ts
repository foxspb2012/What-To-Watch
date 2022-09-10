#!/usr/bin/env node

import VersionCommand from './сli-command/version-command.js';
import HelpCommand from './сli-command/help-command.js';
import ImportCommand from './сli-command/import-command.js';
import CLIApplication from './app/cli-application.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand, new ImportCommand
]);
myManager.processCommand(process.argv);
