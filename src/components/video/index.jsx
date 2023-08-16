import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import VideoItem from './VideoItem';
import VideoPlayer from './VideoPlayer';

const Video = ({ channelTitle, items }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState(null);

    useEffect(() => {
        setNowPlaying(items[0]);
        setIsLoading(false);
    }, []);

    const onClickHandler = (video) => {
        setNowPlaying(video);
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={8} sm={12}>
                {isLoading ? (
                    <Skeleton
                        variant="rectangular"
                        width={'100%'}
                        height={150}
                    />
                ) : (
                    <VideoPlayer
                        channelTitle={channelTitle}
                        video={nowPlaying}
                    />
                )}
            </Grid>
            <Grid item md={4} sm={12}>
                <Stack spacing={1}>
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton
                                    variant="rectangular"
                                    width={'100%'}
                                    height={80}
                                    key={i}
                                />
                            ))}
                        </>
                    ) : (
                        items.map((item) => (
                            <VideoItem
                                item={item}
                                key={item.videoId}
                                nowPlaying={nowPlaying}
                                clickHandler={onClickHandler}
                            />
                        ))
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

Video.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

export default Video;
