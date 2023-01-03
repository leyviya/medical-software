package yconsoft.beans;

import java.util.Optional;

public class ResponseBean <T>{
    private final String message;
    private final Optional<T> data;

    //ensure the data type is compliant with spring Response converter
    public ResponseBean(final String message, final T data){
        this.message = message;
        this.data = Optional.ofNullable(data);
    }
    public ResponseBean(final String message){
        this.message = message;
        this.data = Optional.empty();
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data.isEmpty() ? null : data.get();
    }
}
