/* @flow */
import Sequelize from 'sequelize';
import getConfig from './config';

const {pgUrl} = getConfig();

const sequelize = new Sequelize(pgUrl);

export type LinkType = {
  +id: number,
  +url: string,
  +visitCount: number,
};

export const Link = sequelize.define('visited_link', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  count: {
    type: Sequelize.BIGINT,
    defaultValue: 1,
  },
}, {
  underscored: true,
  underscoredAll: true,
  indexes: [{
    unique: true,
    fields: ['url'],
  }],
});

export async function getVisitedLink(url: string): Promise<LinkType> {
  const link = await Link.findOne({
    where: {url},
  });

  if (link == null) {
    return Link.create({url});
  } else {
    link.count += 1;
    return link.save();
  }
}
