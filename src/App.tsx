import { useEffect, useState } from 'react';
import './App.css';
import CardItem from './CardItem';

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [needToCall, setNeedToCall] = useState<boolean>(true);
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
      const data = await response.json();
      if (data.nodes.length === 0) {
        setNeedToCall(false)
        return
      }
      setItems((prevItems: any) => [...prevItems, ...data.nodes]);
    } catch (error) {
      console.log("Error:", error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page)
  }, [])

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && needToCall) {
      fetchData(page + 1)
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <div className="cardDiv"
      onScroll={handleScroll}
    >
      <div className='cardDivInner'>
        {
          items.length ? items?.map((item: any) => {
            const { field_photo_image_section, last_update, title } = item.node

            return <CardItem
              field_photo_image_section={field_photo_image_section}
              title={title}
              last_update={last_update}
            />
          }) : <h5 className='noData'>No Data</h5>
        }
        {
          isLoading && page !== 1 && <h5 className='noData'>Loading...</h5>
        }
        {
          !needToCall && page !== 1 && <h5 className='noData'>No More Data</h5>
        }
      </div>
    </div>
  );
}

export default App;
