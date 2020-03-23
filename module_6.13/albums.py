import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_PATH = "sqlite:///albums.sqlite3"
Base = declarative_base()

class Album(Base):
	__tablename__="album"
	id=sa.Column(sa.INTEGER, primary_key=True)
	year=sa.Column(sa.INTEGER)
	artist=sa.Column(sa.TEXT)
	genre=sa.Column(sa.TEXT)
	album=sa.Column(sa.TEXT)

#print albums
def printAlbums(artist):
	session=connect_db()
	artist_albums=session.query(Album).filter(Album.artist==artist).all()
	return artist_albums
	

#save album
def saveAlbum(new_rec):
	session=connect_db()
	# check if album exists in DB
	rec=session.query(Album).filter(Album.year==new_rec.year,Album.artist==new_rec.artist,Album.genre==new_rec.genre,Album.album==new_rec.album).first()
	if rec:
		return False
	session.add(new_rec)
	session.commit()
	return True

def connect_db():
	engine=sa.create_engine(DB_PATH)
	Base.metadata.create_all(engine)
	Session=sessionmaker(engine)
	return Session()

