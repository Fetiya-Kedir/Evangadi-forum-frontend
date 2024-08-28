import React from 'react';
import { CiFacebook } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import { ImYoutube2 } from 'react-icons/im';
import style from './Footer.module.css';

function Footer() {
	return (
		<div className={style.container}>
			<div className={style.footer}>
				<div>
					<img
						src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
						alt="Evangadi Logo"
					/>
					<div className={style.icons}>
						<div className={style.facebook}>
							<a
								href="https://www.facebook.com/evangaditech"
								style={{ textDecoration: 'none' }}
							>
								<CiFacebook size={40} />
							</a>
						</div>
						<div className={style.instagram}>
							<a
								href="https://www.instagram.com/evangaditech/"
								style={{ textDecoration: 'none' }}
							>
								<FaInstagram size={40} />
							</a>
						</div>
						<div className={style.youtube}>
							<a
								href="https://www.youtube.com/@EvangadiTech"
								style={{ textDecoration: 'none' }}
							>
								<ImYoutube2 size={40} />
							</a>
						</div>
					</div>
				</div>
				<div className={style.h3}>
					<h3>Useful Link</h3>
					<a href="https://www.evangadi.com/legal/terms/">
						<p>Terms of Service</p>
					</a>
					<a href="https://www.evangadi.com/legal/privacy/">
						<p>Privacy Policy</p>
					</a>
				</div>
				<div className={style.h3}>
					<h3>Contact info</h3>
					<p>support@evangadi.com</p>
					<p>+1-202-386-2702</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
