package com.janay.cleanyoutubeapi.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Function;

public class DateFormatter implements Function<LocalDateTime, String> {
    private final DateTimeFormatter formatter
            = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    @Override
    public String apply(LocalDateTime date) {
        return formatter.format(date);
    }
}
