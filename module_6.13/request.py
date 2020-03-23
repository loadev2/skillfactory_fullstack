from bottle import route
from bottle import run
from bottle import request
from bottle import HTTPError
import traceback
import datetime
import sys

import albums


#get artist(get request) and return lists of almubs of this artist
@route("/albums/<artist>")
def getAlbumsByArtist(artist):
	try:
		artist_str=str(artist)
	except ValueError:
		result=HTTPError(400,"Wrong param")
	else:
		artist_albums=albums.printAlbums(artist_str)
		result=f"{artist_str} count albums is {len(artist_albums)}."
		if artist_albums:
			result+="<br>List of albums:<br>"
			result+="<ul>"
			for record in artist_albums:
				result+=f"<li>{record.album}</li>"
			result+="</ul>"

	return result


#get post-data to store album
@route("/albums/", method="POST")
def saveNewRecord():
	
	try:
		new_rec=albums.Album();
		new_rec.year=int(request.forms.get("year"))
		if new_rec.year<1900 or new_rec.year>int(datetime.datetime.now().year):
			raise ValueError("year is not valid")
			
		new_rec.artist=str(request.forms.get("artist"))
		new_rec.genre=str(request.forms.get("genre"))
		new_rec.album=str(request.forms.get("album"))
		is_saved=albums.saveAlbum(new_rec)

		if not is_saved:
			return HTTPError(409,"record has been already stored in DB")

	except ValueError:
		return f"Wrong param was got. Description {traceback.format_exc()}"
	except NameError:
		return f"NameError. Description: {traceback.format_exc()}"
	except AttributeError:
		return f"AttributeError. Description: {traceback.format_exc()}"
	except:
		return f"Unexpected error:{traceback.format_exc()}"
	else:
		return "New record was stored in DB"




if __name__=="__main__":
	run(host="localhost",port=8080,debug=True)