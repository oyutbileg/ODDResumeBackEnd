const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let db = {};

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

let SysUser = sequelize.define('sys_user', {
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
        defaultValue: null
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            notNull: {
                msg: "Имэйл хаягийг оруулна уу."
            },
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Нууц үг оруулна уу!"
            },
            notEmpty: true,
        }
    },
    skill_tags: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    profile_path: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    remember_token: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'sys_user',
    timestamps: false,
    hooks: {
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10);
            return user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

let SkillTag = sequelize.define('skill_tag', {
    tag: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'skill_tag',
    timestamps: false
});

let Experience = sequelize.define('experience', {
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    start_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    end_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'experience',
    timestamps: false
});

let Project = sequelize.define('project', {
    project_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'project',
    timestamps: false
});

let ProjectUrl = sequelize.define('project_url', {
    path: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    type: {
        type: Sequelize.ENUM('web', 'playstore', 'appstore'),
        defaultValue: 'web'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    modified_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'project_url',
    timestamps: false
});

//#region [Project with SysUser]
SysUser.hasMany(Project)
Project.belongsTo(SysUser, { as: 'sysUser' })
// #endregion

//#region [Experience with SysUser]
SysUser.hasMany(Experience)
Experience.belongsTo(SysUser, { as: 'sysUser' })
// #endregion

//#region [Experience with SysUser]
Project.hasMany(ProjectUrl)
ProjectUrl.belongsTo(Project, { as: 'project' })
// #endregion

db.sysUser = SysUser;
db.skillTag = SkillTag;
db.experience = Experience
db.project = Project;
db.projectUrl = ProjectUrl;

db.sequelize = sequelize;

db.sysUser.prototype.getJWT = function (obj) {
    return {
        token: tokenGenerate(obj),
        refresh: tokenGenerate(obj, false)
    }
};

const tokenGenerate = (obj, type = true) => {
    return jwt.sign({ id: obj.id, name: obj.name, is_admin: obj.is_admin ? 'true' : 'false' }, process.env.JWT_SECRET, {
        expiresIn: type ? process.env.JWT_LOGIN_EXPIRESIN : process.env.JWT_REFRESH_EXPIRESIN,
    });
}

db.sysUser.prototype.checkPassword = async function (enteredPassword, obj) {
    const res = await bcrypt.compare(enteredPassword, obj.password);
    return res;
};

module.exports = db;
