//package viosmash.handler;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.http.server.reactive.ServerHttpResponse;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.server.ResponseStatusException;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//import viosmash.pojo.CommonResult;
//import viosmash.utils.WebFrameworkUtils;
//
//@Component
//@Slf4j
//public class GlobalExceptionHandler implements ErrorWebExceptionHandler {
//
//    @Override
//    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
//        ServerHttpResponse response = exchange.getResponse();
//        if (response.isCommitted()) {
//            return Mono.error(ex);
//        }
//        CommonResult<?> result;
//        if (ex instanceof ResponseStatusException) {
//            result = responseStatusExceptionHandler(exchange, (ResponseStatusException) ex);
//        } else {
//            result = defaultExceptionHandler(exchange, ex);
//        }
//        return WebFrameworkUtils.writeJson(exchange, result);
//    }
//    @ExceptionHandler(value = Exception.class)
//    private CommonResult<?> defaultExceptionHandler(ServerWebExchange exchange, Throwable ex) {
//        ServerHttpRequest request = exchange.getRequest();
//        log.error("[defaultExceptionHandler][uri({}/{})]",
//                request.getURI(), request.getMethod(), ex);
//        return CommonResult.error(ex.getMessage(),500);
//    }
//
//    private CommonResult<?> responseStatusExceptionHandler(ServerWebExchange exchange,
//                                                           ResponseStatusException ex) {
//        ServerHttpRequest request = exchange.getRequest();
//        log.error("[responseStatusExceptionHandler][uri({}/{})]", request.getURI(), request.getMethod(), ex);
//        return CommonResult.error(ex.getReason(), 4444);
//    }
//}
