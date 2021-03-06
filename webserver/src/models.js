/* @flow */
import Sequelize from 'sequelize';
import getConfig from './config';

const {pgUrl} = getConfig();

export const sequelize = new Sequelize(pgUrl);

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
    type: Sequelize.INTEGER,
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

function ensureAbsoluteUrl(url: string): string {
  if (!url.startsWith('http')) {
    return `http://${url}`;
  }
  return url;
}

function normalizeUrl(url: string): string {
  return [
    ensureAbsoluteUrl,
  ].reduce((cleanUrl, fn) => fn(cleanUrl), url);
}

export async function getVisitedLink(url: string): Promise<LinkType> {
  // TODO: sequelize does not support a means of doing an upsert with a functional
  // value for the update. There is definitely a way to do a SELECT and update the value
  // if it exists using raw SQL. For the sake of pushing out a working prototype this
  // low performance implementation will work and the fix will be tracked in Github:
  // https://github.com/danthewildcat/link-shortener/issues/2
  const cleanUrl = normalizeUrl(url);
  console.log({url, cleanUrl});
  const link = await Link.findOne({
    where: {url: cleanUrl},
  });

  if (link == null) {
    return Link.create({url: cleanUrl});
  } else {
    link.count += 1;
    return link.save();
  }
}
