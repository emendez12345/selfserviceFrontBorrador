export default class NoticiaService {
	getNoticias() {
		return fetch('data/noticias.json').then(res => res.json()).then(d => d.data);
    }
}