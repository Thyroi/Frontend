import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClients, getUserLists, updateListDeleted } from '../../actions';
import style from './WishList.module.scss';
import swal from '@sweetalert/with-react';

export default function Wishlist({ match }) {
	const lists = useSelector((state) => state.lists);
	const clients = useSelector((state) => state.allClients);
	const client = useSelector((state) => state.loggedInClient);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserLists(client.phone));
		dispatch(getClients());
	}, [dispatch]);

	const id = match.params.id;

	const list = lists?.find((l) => l.id == id);

	function handleDelete(e) {
		const borrar = list.List.filter((p) => p.id_product !== e.id_product);
		const updated = {
			id: parseInt(id),
			ClientPhone: list.ClientPhone,
			rList: borrar.map((p) => p.id_product),
			Colaborators: list.Colaborators,
			title: list.title,
		};
		dispatch(updateListDeleted(updated));
		setTimeout(() => {
			dispatch(getUserLists(client.phone));
		}, 1000);
	}

	async function handleInvite(e) {
		e.preventDefault();
		const invitation = await swal({
			text: 'Email address',
			content: 'input',
			button: 'Send invitation to your list',
		});
		if (clients.find((e) => e.email === invitation)) {
			console.log('VEVOVE');
		}
	}

	return (
		<div className={style.containerList}>
			<h1>{list?.title}</h1>

			{list &&
				list?.List.map((e) => {
					return (
						<div
							key={e.id_product}
							className={style.containerProduct}>
							<div className={style.imgContainer}>
								{e.is_offer && (
									<span className={style.offer}>
										{'SALE'}
									</span>
								)}
								<Link to={`/products/${e.id_product}`}>
									<img
										className={style.productImage}
										src={e.default_image}
										alt=''
									/>
								</Link>
							</div>
							<div className={style.infoContainer}>
								<div className={style.subInfoContainer}>
									<h3 className={style.nameProduct}>
										{e.name}
									</h3>
									<p
										className={style.productPrice}
										id='individualProductPrice'>
										{`$${e.price}`}
									</p>
									<p className={style.description}>
										{e.description}
									</p>
									<div className={style.buttonContainer}>
										<button
											onClick={() => {
												handleDelete(e);
											}}>
											Remove
										</button>
										<button onClick={handleInvite}>
											Share this list
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}
