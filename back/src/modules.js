const fs = require('fs');
const mainManifest = require(`${process.env.MODULES_ROOT_PATH}/package.json`);
const modulesConfig = require('./modulesConfig');
const { spawn } = require('child_process');
const dotenv = require('dotenv');
const dotenvStringify = require('dotenv-stringify');

process.env.FORCE_COLOR = true;

const modulesManager = {
  socketManager: undefined,
  modules: [],
  actions: {
    startModule(options) {
      modulesManager.startModule(options.name);
    },
    stopModule(options) {
      modulesManager.stopModule(options.name);
    },
    installModule(options) {
      modulesManager.installModule(options.name);
    },
    removeModule(options) {
      modulesManager.removeModule(options.name);
    },
    saveEnv(options) {
      modulesManager.saveEnv(options.name, options.env);
    },
    saveModuleConfig(options) {
      modulesConfig.setModuleConfig(options.name, options.config).then(() => {
        modulesManager.modules[options.name].config = options.config;
        modulesManager.broadcastModuleList();
      });
    }
  },

  init() {
    const dependencies = Object.keys(mainManifest.dependencies);
    const modules = {};
    const modulesToStart = [];
    for (var i = 0; i < dependencies.length; i++) {
      this.addModuleToList(dependencies[i]);

      if(modulesConfig.config && modulesConfig.config[dependencies[i]] && modulesConfig.config[dependencies[i]].autostart) {
        modulesToStart.push(dependencies[i]);
      }
    }

    for (var i = 0; i < modulesToStart.length; i++) {
      this.startModule(modulesToStart[i]);
    }
  },

  addModuleToList(name) {
    const envPath = `${process.env.MODULES_ROOT_PATH}/env/${name}.env`;
    let env = {};
    if (fs.existsSync(envPath)) {
      env = dotenv.parse(fs.readFileSync(envPath));
    }
    console.log('config?', modulesConfig.config[name]);
    this.modules[name] = {
      manifest: JSON.parse(fs.readFileSync(`${process.env.MODULES_ROOT_PATH}/node_modules/${name}/package.json`)),
      config: modulesConfig.config[name] || {},
      env,
    };

    console.log('env', this.modules[name].env)
    this.broadcastModuleList();
  },

  removeModuleFromList(name) {
    delete this.modules[name];

    this.broadcastModuleList();
  },

  startModule(moduleName) {
    const mainPath = `${process.env.MODULES_ROOT_PATH}/node_modules/${moduleName}/${this.modules[moduleName].manifest.main}`;
    const child = spawn('node', [mainPath], {
      env: this.modules[moduleName].env,
      cwd: process.env.MODULES_ROOT_PATH
    })
    this.modules[moduleName].status = 'running';
    this.modules[moduleName].process = child;
    
    child.stdout.on('data', (signal) => {
      console.log(`log ${signal}`);
    });

    child.stderr.on('data', (signal) => {
      console.log(`error ${signal}`);
    });

    child.stdout.on('close', (code, signal) => {
      this.modules[moduleName].status = 'stopped';
      console.log(`exit ${signal}`);
      this.broadcastModuleList();
    });

    this.broadcastModuleList();
  },
  stopModule(moduleName) {
    console.log('stopModule', moduleName);
    this.modules[moduleName].process.kill();
    this.modules[moduleName].status = 'stopped';

    this.broadcastModuleList();
  },
  installModule(moduleName) {
    const child = spawn('yarn', ['add', moduleName], {
      env: process.env,
      cwd: process.env.MODULES_ROOT_PATH
    });
    child.stdout.on('close', (code, signal) => {
      this.addModuleToList(moduleName);
      console.log(`close ${code} ${signal}`);
    });
  },
  removeModule(moduleName) {
    const child = spawn('yarn', ['remove', moduleName], {
      env: process.env,
      cwd: process.env.MODULES_ROOT_PATH
    });

    child.stdout.on('close', (code, signal) => {
      this.removeModuleFromList(moduleName);
      console.log(`close ${code} ${signal}`);
    });
  },
  saveEnv(moduleName, env) {
    env = JSON.parse(env);
    const stringifiedEnv = dotenvStringify.stringify(env);
    fs.writeFile(`${process.env.MODULES_ROOT_PATH}/env/${moduleName}.env`, stringifiedEnv, (err) => {
      if(err) {
        return console.log(err);
      }

      this.modules[moduleName].env = env;
      this.broadcastModuleList();
      console.log("The file was saved!");
    });
  },
  broadcastModuleList() {
    modulesNames = Object.keys(modulesManager.modules);
    const modules = {};

    for (var i = 0; i < modulesNames.length; i++) {
      modules[modulesNames[i]] = { ...this.modules[modulesNames[i]] };
      delete modules[modulesNames[i]].process;
    }

    this.socketManager.io.emit('setModuleList', modules);
  }
};

module.exports = modulesManager;