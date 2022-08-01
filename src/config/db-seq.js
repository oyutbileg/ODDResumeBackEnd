const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let db = {};

console.log("DB Name: ", process.env.SEQUELIZE_DATABASE);
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000, // milliseconds
      idle: 10000,
    },
    operatorAliases: false,
  }
);

let SysUser = sequelize.define(
  "sys_user",
  {
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    position: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        notNull: {
          msg: "Имэйл хаягийг оруулна уу.",
        },
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Нууц үг оруулна уу!",
        },
        notEmpty: true,
      },
    },
    skill_tags: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    photo: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    experience: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    list_order: {
      defaultValue: 0,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    portfolio_id: {
      type: Sequelize.UUID,
      defaultValue: null,
    },
    remember_token: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    modified_at: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "sys_user",
    timestamps: false,
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        return (user.password = await bcrypt.hash(user.password, salt));
      },
      afterCreate: async function (user) {
        await user.update({
          list_order: user.id,
        });
      },
    },
  }
);

let SkillTag = sequelize.define(
  "skill_tag",
  {
    tag: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    modified_at: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "skill_tag",
    timestamps: false,
  }
);

let Project = sequelize.define(
  "project",
  {
    project_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    appstore_url: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    playstore_url: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    web_url: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    modified_at: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "project",
    timestamps: false,
  }
);

let Config = sequelize.define(
  "config",
  {
    site_password: {
      type: Sequelize.STRING,
      allowNull: null,
    },
    is_reparing: {
      type: Sequelize.BOOLEAN,
      allowNull: null,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    tableName: "config",
    timestamps: false,
    hooks: {
      beforeCreate: async function (config) {
        const salt = await bcrypt.genSalt(10);
        return (config.site_password = await bcrypt.hash(
          config.site_password,
          salt
        ));
      },
    },
  }
);

//#region [Project with SysUser]
SysUser.hasMany(Project);
Project.belongsTo(SysUser, { as: "sysUser" });
// #endregion

db.config = Config;
db.sysUser = SysUser;
db.skillTag = SkillTag;
db.project = Project;

db.sequelize = sequelize;

db.sysUser.prototype.getJWT = function (obj) {
  return {
    token: tokenGenerate(obj),
    refresh: tokenGenerate(obj, false),
  };
};

const tokenGenerate = (obj, type = true) => {
  return jwt.sign(
    {
      id: obj.id,
      name: obj.name,
      is_admin: obj.is_admin ? "true" : "false",
      is_active: obj.is_active,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: type
        ? process.env.JWT_LOGIN_EXPIRESIN
        : process.env.JWT_REFRESH_EXPIRESIN,
    }
  );
};

db.config.prototype.getJWT = function () {
  return {
    token: siteToken(),
  };
};

const siteToken = () => {
  return jwt.sign({ secret: "#_#" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LOGIN_EXPIRESIN,
  });
};

db.sysUser.prototype.checkPassword = async function (enteredPassword, obj) {
  return await bcrypt.compare(enteredPassword, obj.password);
};

module.exports = db;
